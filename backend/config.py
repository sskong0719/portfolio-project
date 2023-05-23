# config.py
import os

class Config:
    # Flask configuration
    SECRET_KEY = os.urandom(100)
    DEBUG = False


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    # Additional production-specific configuration
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

# Configure Flask-WTF CSRF protection
WTF_CSRF_ENABLED = True
# You can customize the CSRF secret key if needed
# CSRF_SESSION_KEY = 'your-csrf-session-key'

# Configure Flask-Session to use secure cookies
SESSION_COOKIE_SECURE = True

# Configure Flask-Session to use signed cookies
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

# Configure Flask-Session cookie name
SESSION_COOKIE_NAME = 'your-cookie-name'

# Configure Flask-Session cookie duration (in seconds)
SESSION_COOKIE_DURATION = 60 * 60 * 24 * 7  # 1 week

# Define the name of the cookie for light/dark mode preference
THEME_COOKIE_NAME = 'theme'
