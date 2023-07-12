import db_base as db

class Admin:
    def __init__(self, row):
        self.uid = row[0]
        self.student_name = row[1]
        self.password = row[2]

class AdminCRUD(db.DBbase):

    def reset_database(self):
        try:
            sql = """
                DROP TABLE IF EXISTS Student;

                CREATE TABLE Student (
                    uid TEXT PRIMARY KEY UNIQUE,
                    student_name TEXT UNIQUE,
                    password TEXT);

            """
            super().execute_script(sql)
        except Exception as e:
            print("Exception occurred :", e)

    #read_from_csv
    def read_student_date(self, file_name):
        self._students = []

        try:
            with open(file_name, "r") as record:
                csv_reader = csv.reader(record)
                next(record)
                for row in csv_reader:
                    student = Student(row)
                    self._students.append(student)
        except Exception as e:
            print("Exception occurred :", e)

    #saving_data_to_database
    def save_to_database(self):
        print("Number of records to save: ", len(self._students))
        save = input("Continue? ").lower()
        if save == "y":
            for student in self._students:

                try:
                    super().get_cursor.execute(""" INSERT INTO Student (uid,student_name,password)
                    VALUES (?,?,?)""", (student.uid, student.student_name, student.password))
                    super().get_connection.commit()
                    print("Saved student record :", student.uid, student.student_name)
                except Exception as e:
                    print("Exception occurred :", e)
        else:
            print("Export to DB aborted!")