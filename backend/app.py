from flask import Flask, jsonify, request, make_response, send_from_directory
from database import Database
import validate
import smtp

app = Flask(__name__)

db = Database()


@app.route('/', methods=['GET'])
def index():
    return {
        "channel": "The Show",
        "tutorial": "React, Flask and Docker"
    }


@app.route("/submit-contact-form", methods=['POST'])
def contact():
    errors = []

    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    if not validate.validate_email(email):
        errors.append({'email': 'Invalid email address'})

    if errors:
        response = {
            'status': '0',
            'message': errors
        }
    else:
        success = db.add_contact(name, email, message)
        smtp.send_email(name, email, message)
        if success:
            response = {
                'status': '1',
                'message': 'Form submitted successfully'
            }
        else:
            response = {
                'status': '0',
                'message': 'Failed to submit the form'
            }

    return jsonify(response)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
