from pymongo import MongoClient
import enum
import hashlib
import datetime
import pytz


class Database:
    def __init__(self):
        mongo_client = MongoClient("mongodb://localhost:27017/")
        self.db = mongo_client["Portfolio-Website"]
        self.contact_collection = self.db["Contact"]

    def add_contact(self, name, email, message):
        # Establish the timezone as US/Eastern
        timezone = pytz.timezone("US/Eastern")
        # Get the current date and time for this timezone
        current_datetime = datetime.datetime.now(timezone)

        try:
            # Check if there is a "Contact" collection in the database
            if "Contact" in self.db.list_collection_names():
                # If there is, try to find an existing contact with the same email
                existing_contact = self.contact_collection.find_one(
                    {"email": email},
                    {"_id": 0}  # We don't need the MongoDB id field
                )
                # If the contact exists
                if existing_contact:
                    # Get the list of messages for this contact (default to an empty list if not present)
                    messages = existing_contact.get("messages", [])

                    # Create the new message with the current datetime
                    new_message = {
                        "message": message,
                        "datetime": current_datetime.strftime("%Y-%m-%d %H:%M:%S"),
                    }
                    # Add the new message to the list
                    messages.append(new_message)
                    # Update the contact's messages in the database
                    self.contact_collection.update_one(
                        {"email": email},
                        {"$set": {"messages": messages}}
                    )
                    # Return True indicating success
                    return True
                else:  # If the contact does not exist
                    # Create a new contact with the given name, email, and message
                    new_contact = {
                        "name": name,
                        "email": email,
                        "messages": [
                            {
                                "message": message,
                                "datetime": current_datetime.strftime("%Y-%m-%d %H:%M:%S")
                            }
                        ]
                    }
                    # Insert the new contact into the database
                    self.contact_collection.insert_one(new_contact)
                    # Return True indicating success
                    return True
            else:  # If there is no "Contact" collection in the database
                # Create a new contact with the given name, email, and message
                new_contact = {
                    "name": name,
                    "email": email,
                    "messages": [
                        {
                            "message": message,
                            "datetime": current_datetime.strftime("%Y-%m-%d %H:%M:%S")
                        }
                    ]
                }
                # Insert the new contact into the database
                self.contact_collection.insert_one(new_contact)
                # Return True indicating success
                return True
        except Exception as e:  # Handle any exceptions
            # Print the error message
            print(f"An error occurred while adding the contact: {str(e)}")
            # Return False indicating failure
            return False

