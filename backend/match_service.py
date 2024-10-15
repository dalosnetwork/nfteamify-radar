import schedule
import time
from datetime import datetime

def job():
    now = datetime.now()
    if now.strftime("%H") == "00":
        print("öcü geldi")

def run_scheduler():
    schedule.every().hour.at(":00").do(job)
    while True:
        schedule.run_pending()
        time.sleep(1)
