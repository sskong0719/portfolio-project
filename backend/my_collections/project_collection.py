import datetime
from pymongo.collection import Collection


class ProjectCollection:
    def __init__(self, db):
        self.projects_collection: Collection = db["Projects"]
