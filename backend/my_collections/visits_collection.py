from pymongo.collection import Collection
from datetime import datetime, timedelta


class VisitsCollection:
    def __init__(self, db):
        self.visits_collection: Collection = db["DailyVisits"]

    def increment_unique_visit_count(self):
        today = datetime.now().strftime("%Y-%m-%d")
        visits = self.visits_collection.find_one({"date": today})
        if not visits:
            self.visits_collection.insert_one({"date": today, "count": 1})
        else:
            self.visits_collection.update_one({"date": today}, {"$inc": {"count": 1}})

    def get_visit_count(self):
        today = datetime.now().strftime("%Y-%m-%d")
        visits = self.visits_collection.find_one({"date": today})
        return visits["count"] if visits else 0

    def get_visits_by_time_frame(self, start_date):
        results = list(self.visits_collection.find({"date": {"$gte": start_date}}))
        return results
