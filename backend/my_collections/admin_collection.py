from pymongo.collection import Collection
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

class AdminCollection:
    
    def __init__(self, db):
        self.admin_collection: Collection = db["Admin"]
        # Insert admin user if collection is empty
        if self.admin_collection.count_documents({}) == 0:
            password = os.getenv('ADMIN_PASSWORD')
            admin_user = {
                "username": "admin",
                "password": generate_password_hash(password)  # Use a secure password hashing method
            }
            self.admin_collection.insert_one(admin_user)

    def check_credentials(self, username, password):
        user = self.admin_collection.find_one({"username": username})
        print("Inside Check Credentials\n")
        print(user+"\n")
        print(user["password"]+"\n")
        print(password+"\n")
        if user and check_password_hash(user["password"], password):
            return True
        return True
