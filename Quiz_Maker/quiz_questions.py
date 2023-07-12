import random
import pandas as pd
from sqlalchemy import column, select, insert, update

import quiz_db as db

engine, Base = db.engine, db.Base


class QuestionsCRUD:

    def questions_count(self, category):
        if category is not None:
            with engine.begin() as conn:
                return len(conn.execute(select(db.Questions).where(db.Questions.category == category)).fetchall())
        return 0

    def play_quiz(self, no_of_questions, category):
        try:
            with engine.begin() as conn:
                question_set = {}
                for i in range(no_of_questions):
                    question_id = random.randint(1, self.questions_count(category))
                    if len(question_set.keys()) == 0:
                        question_set.update({question_id: conn.execute(
                            select(column('question'), column('answer')).
                            select_from(db.Questions).
                            filter_by(category=category).
                            filter_by(question_id=question_id)).fetchall()[0]})
                        continue
                    while question_id in question_set.keys():
                        question_id = random.randint(1, no_of_questions)
                    question_set.update({question_id: conn.execute(
                        select(column('question'), column('answer')).
                        select_from(db.Questions).
                        filter_by(category=category).
                        filter_by(question_id=question_id)).fetchall()[0]})
                return question_set
        except Exception as e:
            print("Exception:", e)
            return False

    def create_question_set(self, question, answer, category):
        try:
            with engine.begin() as conn:
                insert_programming = insert(db.Questions).values(question=question, answer=answer, category=category)
                conn.execute(insert_programming)
        except Exception as e:
            print("Exception:", e)
            return False
        return True


questions = QuestionsCRUD()


# columns = ["question", "answer", "category"]
# records = pd.read_csv("programming.csv", names=columns, skiprows=1)
# with engine.connect() as conn:
#     records.to_sql("Questions", conn, if_exists="append", index=False)
