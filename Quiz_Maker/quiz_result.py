import logging

from sqlalchemy import Column, Integer, String, DateTime, UniqueConstraint, ForeignKey, column, select, insert, update
from sqlalchemy.orm import relationship
import quiz_db as db
import datetime

engine, Base = db.engine, db.Base

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


class ResultCRUD:

    def create_quiz_result(self, uid, category, score):
        try:
            with engine.connect() as conn:
                names = conn.execute(
                    select(column("first_name"), column("last_name")).
                    select_from(db.User).
                    filter_by(uid=uid)).fetchall()[0]
                student_name = names[0] + " " + names[1]
                now = datetime.date.today()
                insert_query = insert(db.Results).values(uid=uid, student_name=student_name, category=category, percentage_score=score, date=now)
                conn.execute(insert_query)
                conn.commit()
            return True
        except Exception as e:
            logging.exception('Exception occurred during database operation')
            print("Exception occurred :", e)

    def fetch_student_result_history(self, uid=None):
        try:
            if uid is not None:
                with engine.connect() as conn:
                    return conn.execute(select(db.Results).filter_by(uid=uid)).fetchall()
            else:
                with engine.connect() as conn:
                    return conn.execute(select(db.Results)).fetchall()
        except Exception as e:
            print("Exception occurred :", e)

result = ResultCRUD()