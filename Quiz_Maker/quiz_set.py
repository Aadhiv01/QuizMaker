import db_base as db
import csv

#Question class to store all question details
class Question:

    def __init__(self, row):
        self.question_id = row[0]
        self.question = row[1]
        self.answer = row[2]

class QuestionCRUD(db.DBbase):

    def __init__(self):
        super().__init__("quiz_master.sqlite")

    #Creating/Adding_Quiz_Questions
    def create_question(self, question, answer):
        try:
            super().get_cursor.execute("INSERT INTO Questions (question,answer) values(?,?);",
                                       (question, answer))
            super().get_connection.commit()
            print(f"Question record with question as : {question} and answer as : {answer} created successfully!")
        except Exception as e:
            print("This Question already exists in the database")

    #Fetching_Quiz_Questions
    def read_question(self, question_id=None):
        try:
            if question_id is not None:
                return super().get_cursor.execute("SELECT * FROM Questions where question_id = ?;",
                                                  (question_id,)).fetchone()
            else:
                return super().get_cursor.execute("SELECT * FROM Questions;").fetchall()
        except Exception as e:
            print("Exception occurred :", e)

    #Updating_Quiz_Questions
    def update_question(self, question_id, question, answer):
        try:
            super().get_cursor.execute("UPDATE Questions SET question = ?, answer = ? WHERE question_id = ?;",
                                       (question, answer, question_id))
            super().get_connection.commit()
            print(f"Updated question record with id: {question_id} to question : {question} and answer: {answer} successfully!")
        except Exception as e:
            print("Exception occurred :", e)

    #Deleting_Quiz_Questions
    def delete_question(self, question_id):
        try:
            if self.read_question(question_id) is None:
                print(f"Question with id: {question_id} doesn't exist!")
                return False
            super().get_cursor.execute("DELETE FROM Questions where question_id = ?;", (question_id,))
            super().get_connection.commit()
            print(f"Deleted question record with id: {question_id} successfully!")
            return True

        except Exception as e:
            print("Exception occurred :", e)

    def get_no_of_questions(self):
        try:
            return len(super().get_cursor.execute("SELECT * FROM Questions;").fetchall())
        except Exception as e:
            print("Exception occurred :", e)

    #Resetting_Quiz_Database
    def reset_database(self):
        try:
            sql = """
                DROP TABLE IF EXISTS Questions;

                CREATE TABLE Questions (
                    question_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                    question TEXT UNIQUE,
                    answer TEXT UNIQUE);

            """
            super().execute_script(sql)
        except Exception as e:
            print("Exception occurred :", e)

    #read_from_csv
    def read_question_data(self, file_name):
        self._questions = []

        try:
            with open(file_name, "r") as record:
                csv_reader = csv.reader(record)
                next(record)
                for row in csv_reader:
                    question = Question(row)
                    self._questions.append(question)
        except Exception as e:
            print("Exception occurred :", e)

    #saving_data_to_database
    def save_to_database(self):
        print("Number of records to save: ", len(self._questions))
        save = input("Continue? ").lower()
        if save == "y":
            for question in self._questions:

                try:
                    super().get_cursor.execute(""" INSERT INTO Questions (
                    question,answer)
                    VALUES (?,?)""", (question.question, question.answer))
                    super().get_connection.commit()
                    print("Saved question record :", question.question, question.answer)
                except Exception as e:
                    print("Exception occurred :", e)
        else:
            print("Export to DB aborted!")

# question = QuestionCRUD("quiz_master.sqlite")
# question.reset_database()
# question.read_question_data("Quiz_set.csv")
# question.save_to_database()
