from pymongo.collection import Collection
from datetime import datetime, timedelta


class VisitsCollection:
    def __init__(self, db):
        self.visits_collection: Collection = db["DailyVisits"]

    def increment_unique_visit_count(self):
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M")
        visits = self.visits_collection.find_one({"date": current_time})
        if not visits:
            self.visits_collection.insert_one({"date": current_time, "count": 1})
        else:
            self.visits_collection.update_one(
                {"date": current_time}, {"$inc": {"count": 1}}
            )

    def get_visit_count(self):
        today = datetime.now().strftime("%Y-%m-%d")
        visits = self.visits_collection.find_one({"date": {"$regex": f"^{today}"}})
        return visits["count"] if visits else 0

    def get_visits_by_time_frame(self, start_date):
        pipeline = [
            {"$match": {"date": {"$gte": start_date}}},
            {
                "$group": {
                    "_id": {
                        "$substr": ["$date", 0, 13]
                    },  # Group by year-month-day hour
                    "count": {"$sum": "$count"},
                }
            },
            {"$sort": {"_id": 1}},
        ]
        results = list(self.visits_collection.aggregate(pipeline))
        return [{"date": item["_id"], "count": item["count"]} for item in results]
