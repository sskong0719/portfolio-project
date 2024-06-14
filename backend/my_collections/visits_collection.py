from pymongo.collection import Collection

class VisitsCollection:
    def __init__(self, db):
        self.visits_collection: Collection = db["Visits"]

    def increment_unique_visit_count(self):
        visits = self.visits_collection.find_one({'_id': 'visit_count'})
        if not visits:
            self.visits_collection.insert_one({'_id': 'visit_count', 'count': 1})
        else:
            self.visits_collection.update_one({'_id': 'visit_count'}, {'$inc': {'count': 1}})

    def get_visit_count(self):
        visits = self.visits_collection.find_one({'_id': 'visit_count'})
        return visits['count'] if visits else 0
