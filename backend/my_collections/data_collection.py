import datetime
from pymongo.collection import Collection


class DataCollection:
    def __init__(self, db):
        self.data_collection: Collection = db["Data"]

    def add_data(self, data):
        try:
            self.data_collection.insert_one(data)
            return True
        except Exception as e:
            print(f"An error occurred while adding the contact: {str(e)}")
            return False