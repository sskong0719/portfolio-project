from flask import (
    Flask,
    jsonify,
    request,
    make_response,
    send_from_directory,
)
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from datetime import datetime, timedelta
from werkzeug.utils import secure_filename
from flask_cors import CORS
from database import Database
import uuid
import validate
import logging
import smtp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="/usr/share/nginx/html")
CORS(app, supports_credentials=True)

# Configure Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)
db = Database()

# Configure upload folder
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/visitor-cookie", methods=["GET"])
def set_visitor_cookie():
    logger.debug("set_visitor_cookie function called")
    user_id = request.cookies.get("user_id")
    logger.debug(f"Current user_id cookie: {user_id}")
    response = make_response(jsonify(message="User ID set or updated", user_id=user_id))

    if not user_id:
        user_id = str(uuid.uuid4())
        logger.debug(f"Generated new user_id: {user_id}")
        db.visits_collection.increment_unique_visit_count()

    response.set_cookie(
        "user_id",
        user_id,
        max_age=60 * 60 * 24 * 365 * 2,
        httponly=True,
        secure=True,
        samesite="Lax",
    )
    logger.info(f"Set-Cookie header: {response.headers.get('Set-Cookie')}")

    return response


@app.route("/api/visit-count", methods=["GET"])
@jwt_required()
def visit_count():
    count = db.visits_collection.get_visit_count()
    return jsonify({"visit_count": count})


@app.route("/api/visitor-count", methods=["GET"])
@jwt_required()
def visitor_count():
    time_frame = request.args.get("timeFrame", "1Day")
    now = datetime.now()

    if time_frame == "1Day":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        increment = timedelta(hours=1)
        date_format = "%Y-%m-%d %H:%M:%S"
    elif time_frame == "1Week":
        start_date = (now - timedelta(days=7)).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        increment = timedelta(hours=1)
        date_format = "%Y-%m-%d %H:%M:%S"
    elif time_frame == "1Month":
        start_date = (now - timedelta(days=30)).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        increment = timedelta(hours=1)
        date_format = "%Y-%m-%d %H:%M:%S"
    elif time_frame == "3Month":
        start_date = (now - timedelta(days=90)).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        increment = timedelta(hours=6)
        date_format = "%Y-%m-%d %H:%M:%S"
    elif time_frame == "1Y":
        start_date = (now - timedelta(days=365)).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        increment = timedelta(days=1)
        date_format = "%Y-%m-%d"
    elif time_frame == "Max":
        start_date = datetime(1970, 1, 1).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        increment = timedelta(days=1)
        date_format = "%Y-%m-%d"
    else:
        return jsonify({"error": "Invalid time frame"}), 400

    visits = db.visits_collection.get_visits_by_time_frame(
        start_date.strftime("%Y-%m-%d %H:%M:%S")
    )

    date_counts = {visit["date"]: visit["count"] for visit in visits}
    dates = []
    counts = []
    total_visits = 0
    cumulative_count = 0
    current_date = start_date

    while current_date <= now:
        date_str = current_date.strftime(date_format)
        count = date_counts.get(date_str, 0)
        cumulative_count += count
        dates.append(date_str)
        counts.append(cumulative_count)
        total_visits += count
        current_date += increment

    return jsonify({"dates": dates, "counts": counts, "total_visits": total_visits})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not db.admin_collection.check_credentials(username, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@app.route("/api/verify-token", methods=["POST"])
@jwt_required()
def verify_token():
    try:
        current_user = get_jwt_identity()
        logger.debug(f"Token successfully verified for user: {current_user}")
        return jsonify(logged_in_as=current_user), 200
    except Exception as e:
        logger.error(f"Error verifying token: {e}")
        return jsonify({"msg": "Token verification failed"}), 401


# Submit Contact form to database and send to my email
@app.route("/api/submit-contact-form", methods=["POST"])
def contact():
    logger.debug("Contact Reached Testing")
    errors = []

    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    if not validate.validate_email(email):
        errors.append({"email": "Invalid email address"})

    if errors:
        response = {"status": "0", "message": errors}
    else:
        success = db.contact_collection.add_contact(name, email, message)
        if success:
            smtp.send_email(name, email, message)
            response = {"status": "1", "message": "Form submitted successfully"}
        else:
            response = {
                "status": "0",
                "message": "Failed to submit form. Please try again later.",
            }

    return jsonify(response)


@app.route("/api/submit-data", methods=["POST"])
@jwt_required()
def dataHandle():
    errors = []

    # Check if form-data was received
    if not request.form:
        return jsonify({"status": "0", "message": "No form data received"}), 400

    # Extract form data
    data = request.form

    # Extract and clean data fields
    parsed_data = {
        "type": data.get("formType", "").strip(),
        "company": data.get("company", "").strip(),
        "title": data.get("title", "").strip(),
        "skills": data.get("skills", []),
        "date": data.get("date", "").strip(),
        "descriptions": data.get("descriptions", []),
        "projectTitle": data.get("projectTitle", "").strip(),
        "link": data.get("link", "").strip(),
        "language": data.get("language", "").strip(),
        "school": data.get("school", "").strip(),
        "degree": data.get("degree", "").strip(),
        "images": [],
    }

    # Save uploaded images and store unique filenames in parsed_data
    if "images" in request.files:
        for image in request.files.getlist("images"):
            filename = secure_filename(image.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"
            # Store actual image locally
            image.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_filename))
            parsed_data["images"].append(unique_filename)

    # Check if all fields are empty
    if not any(value for value in parsed_data.values() if value or value == [""]):
        errors.append({"status": "0", "message": "All fields are empty"})

    if errors:
        return jsonify(errors)
    else:
        success = db.data_collection.add_data(**parsed_data)
        if success:
            response = {"status": "1", "message": "Data handled successfully"}
        else:
            response = {"status": "0", "message": "Failed to add data to the database"}
        return jsonify(response)


@app.route("/uploads/<filename>")
def get_image(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/api/get-data", methods=["GET"])
def getData():
    try:
        data = list(db.data_collection.find({}, {"_id": 0}))
        return jsonify({"status": "1", "data": data})
    except Exception as e:
        print(f"An error occurred while fetching the data: {str(e)}")
        return jsonify({"status": "0", "message": "Failed to fetch data"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
