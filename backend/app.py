from flask import Flask, jsonify, request, make_response, send_from_directory

app = Flask(__name__)

# Add your routes and other Flask application code below


@app.route('/', methods=['GET'])
def index():
    return {
        "channel": "The Show",
        "tutorial": "React, Flask and Docker"
    }


@app.route('/submit-contact-form')
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']


if __name__ == "__main__":
    app.run(host='0.0.0.0', allow_unsafe_werkzeug=True)
