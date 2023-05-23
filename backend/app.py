from flask import Flask
from config import config

app = Flask(__name__)

# Set the active configuration based on the FLASK_ENV environment variable
env = 'development'  # Default to development if not set
if 'FLASK_ENV' in app.config:
    env = app.config['FLASK_ENV']

if env in config:
    app.config.from_object(config[env])
else:
    app.config.from_object(config['default'])