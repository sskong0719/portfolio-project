from app import app, socketio


if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', allow_unsafe_werkzeug=True)