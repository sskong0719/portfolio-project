import datetime
from pymongo.collection import Collection


class DataCollection:
    def __init__(self, db):
        self.data_collection: Collection = db["Data"]

    def add_data(self, type, company, title, skills, date, descriptions, projectTitle, link, language, school, degree):
        try:
            data = {
                "type": type,
                "company": company,
                "title": title,
                "skills": skills,
                "date": date,
                "descriptions": descriptions,
                "projectTitle": projectTitle,
                "link": link,
                "language": language,
                "school": school,
                "degree": degree
            }
            result = self.data_collection.insert_one(data)
            return result.acknowledged
        except Exception as e:
            print(f"An error occurred while adding the data: {str(e)}")
            return False