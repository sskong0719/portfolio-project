from pymongo import MongoClient
import os
from dotenv import load_dotenv
from my_collections.contact_collection import ContactCollection
from my_collections.data_collection import DataCollection
from my_collections.admin_collection import AdminCollection

load_dotenv()

class Database:
    def __init__(self):
        MONGO_INITDB_ROOT_USERNAME = os.getenv('MONGO_INITDB_ROOT_USERNAME')
        MONGO_INITDB_ROOT_PASSWORD = os.getenv('MONGO_INITDB_ROOT_PASSWORD')
        connection_string = f"mongodb://{MONGO_INITDB_ROOT_USERNAME}:{MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/?authSource=admin"
        mongo_client = MongoClient(connection_string)
        self.db = mongo_client["Portfolio-Website"]

        # Initialize collections
        self.contact_collection = ContactCollection(self.db)
        self.data_collection = DataCollection(self.db)
        self.admin_collection = AdminCollection(self.db)
