from pymongo.collection import Collection

class VisitsCollection:
    def __init__(self, db):
        self.visits_collection: Collection = db["Visits"]

    def increment_unique_visit_count(self):
        if "visit_count" not in self.visits_collection:
            self.visits_collection["visit_count"] = 1
        else:
            self.visits_collection["visit_count"] += 1

    def get_visit_count(self):
        return self.visits_collection.get("visit_count", 0)
