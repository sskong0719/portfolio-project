from flask import Flask, jsonify, request, render_template
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from database import Database
import validate
import smtp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)
db = Database()


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # Render the main React application with the path
    return render_template("index.html", path=path)


@app.route("/login", methods=["POST"])
def login():
    print("\nInside Login\n")
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not db.admin_collection.check_credentials(username, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@app.route("/verify-token", methods=["POST"])
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# Submit Contact form to database and send to my email
@app.route("/submit-contact-form", methods=["POST"])
def contact():
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


@app.route("/submit-data", methods=["POST"])
@jwt_required()
def dataHandle():
    errors = []

    data = {
        "type": request.form.get("formType", "").strip(),
        "company": request.form.get("company", "").strip(),
        "title": request.form.get("title", "").strip(),
        "skills": request.form.get("skills", "").strip(),
        "date": request.form.get("date", "").strip(),
        "descriptions": request.form.getlist("descriptions"),
        "projectTitle": request.form.get("projectTitle", "").strip(),
        "link": request.form.get("link", "").strip(),
        "language": request.form.get("language", "").strip(),
        "school": request.form.get("school", "").strip(),
        "degree": request.form.get("degree", "").strip(),
    }

    if not any(value for value in data.values() if value or value == [""]):
        errors.append({"status": "0", "message": "All fields are empty"})

    if errors:
        return jsonify(errors)
    else:
        success = db.data_collection.add_data(**data)
        if success:
            response = {"status": "1", "message": "Data handled successfully"}

        else:
            response = {"status": "0", "message": "Failed to add data to the database"}
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
