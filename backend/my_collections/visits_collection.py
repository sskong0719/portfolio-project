from pymongo.collection import Collection
from datetime import datetime

class VisitsCollection:
    def __init__(self, db):
        self.visit_logs_collection: Collection = db["VisitLogs"]
        self.totals_collection: Collection = db["Totals"]

    def increment_unique_visit_count(self):
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.visit_logs_collection.insert_one({"timestamp": current_time, "count": 1})

        total_record = self.totals_collection.find_one({"_id": "total_visits"})
        if not total_record:
            self.totals_collection.insert_one({"_id": "total_visits", "count": 1})
        else:
            self.totals_collection.update_one(
                {"_id": "total_visits"}, {"$inc": {"count": 1}}
            )

    def get_total_count_at_end_of_date(self, date_str):
        end_date = datetime.strptime(date_str, "%Y-%m-%d") + timedelta(days=1)
        visit_logs = list(self.visit_logs_collection.find({"timestamp": {"$lt": end_date.strftime("%Y-%m-%d %H:%M:%S")}}))
        total_count = sum(log["count"] for log in visit_logs)
        return total_count

    def get_visits_by_time_frame(self, start_date):
        return list(self.visit_logs_collection.find({"timestamp": {"$gte": start_date}}))