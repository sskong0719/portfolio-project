from flask import Flask, jsonify, request, render_template
from database import Database
import validate
import smtp

app = Flask(__name__)

db = Database()


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # Render the main React application with the path
    return render_template("index.html", path=path)


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
        smtp.send_email(name, email, message)
        success = db.contact_collection.add_contact(name, email, message)
        if success:
            response = {
                "status": "1",
                "message": "Form submitted successfully",
            }
        else:
            response = {
                "status": "0",
                "message": "Form submitted successfully",
            }

    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
