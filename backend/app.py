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

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)
db = Database()

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
    
    # Set or update the cookie
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
def visit_count():
    count = db.visits_collection.get_visit_count()
    return jsonify({"visit_count": count})


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

    # Parse JSON data
    data = request.get_json()

    # Extract and clean data fields
    parsed_data = {
        "type": data.get("formType", "").strip(),
        "company": data.get("company", "").strip(),
        "title": data.get("title", "").strip(),
        "skills": data.get("skills", "").strip(),
        "date": data.get("date", "").strip(),
        "descriptions": data.get("descriptions", []),  # Ensure descriptions is a list
        "projectTitle": data.get("projectTitle", "").strip(),
        "link": data.get("link", "").strip(),
        "language": data.get("language", "").strip(),
        "school": data.get("school", "").strip(),
        "degree": data.get("degree", "").strip(),
    }

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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
