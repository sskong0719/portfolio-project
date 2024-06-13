from pymongo import MongoClient
import datetime
import pytz


class ContactCollection:
    def __init__(self, db):
        self.contact_collection = db["Contact"]

    def add_contact(self, name, email, message):
        timezone = pytz.timezone("US/Eastern")
        current_datetime = datetime.datetime.now(timezone)

        try:
            existing_contact = self.contact_collection.find_one(
                {"email": email}, {"_id": 0}
            )
            if existing_contact:
                messages = existing_contact.get("messages", [])
                new_message = {
                    "message": message,
                    "datetime": current_datetime.strftime("%Y-%m-%d %H:%M:%S"),
                }
                messages.append(new_message)
                self.contact_collection.update_one(
                    {"email": email}, {"$set": {"messages": messages}}
                )
                return True
            else:
                new_contact = {
                    "name": name,
                    "email": email,
                    "messages": [
                        {
                            "message": message,
                            "datetime": current_datetime.strftime("%Y-%m-%d %H:%M:%S"),
                        }
                    ],
                }
                self.contact_collection.insert_one(new_contact)
                return True
        except Exception as e:
            print(f"An error occurred while adding the contact: {str(e)}")
            return False
