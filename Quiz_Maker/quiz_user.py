from sqlalchemy import Column, Integer, String, DateTime, UniqueConstraint, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import select, insert, update
import pandas as pd
import quiz_db as db
import datetime
import bcrypt

engine, Base = db.engine, db.Base


class UserCredentialCRUD:

    def create_user(self, uid, first_name, last_name, usertype, password):
        try:
            with engine.begin() as conn:
                print("In Try")
                password = self.encrypt_password(password)
                insert_query = insert(db.User).values(uid=uid, first_name=first_name, last_name=last_name, type=usertype)
                conn.execute(insert_query)
                print("Done")
                insert_query = insert(db.Credentials).values(uid=uid, password=password, date=datetime.datetime.now())
                conn.execute(insert_query)
        except Exception as e:
            print(e)
            print("---------------This User id already exists in the database-----------")
            return False
        return True

    def encrypt_password(self, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

    # def read_user(self, uid=None):
    #     try:
    #         if uid is not None:
    #             return session.query(db.User).filter_by(uid=uid).first()
    #         else:
    #             return session.query(db.User).all()
    #     except Exception as e:
    #         print("Exception occurred :", e)

    # def update_user_name(self, uid, name):
    #     try:
    #         record = session.query(db.User).filter_by(uid=uid).first()
    #         record.name = name
    #         session.commit()
    #         session.close()
    #         print(f"Updated user record with uid: {uid} to {name} successfully!")
    #     except Exception as e:
    #         print("Exception occurred :", e)
    #     return True

    # def update_user_password(self, uid, password):
    #     try:
    #         records = session.query(db.Credentials).filter_by(uid=uid).order_by(db.User.date.asc()).all()
    #         for record in records:
    #             if record.password == password:
    #                 print("Password used recently! Please use a different password!")
    #                 return False
    #         if len(records) >= 3:
    #             record = session.query(db.Credentials).filter_by(uid=uid).order_by(db.Credentials.date.asc()).first()
    #             session.delete(record)
    #         session.add(db.Credentials(uid, password, datetime.datetime.now()))
    #         session.commit()
    #         session.close()
    #         print(f"Updated user record with uid: {uid} to {password} successfully!")
    #     except Exception as e:
    #         print("Exception occurred :", e)
    #     return True

    # def delete_user(self, uid):
    #     try:
    #         if self.read_user(uid) is None:
    #             print(f"User with uid: {uid} doesn't exist!")
    #             return False
    #         record = session.query(db.User).filter_by(uid=uid).first()
    #         records = session.query(db.Credentials).filter_by(uid=uid).all()
    #         session.delete(record)
    #         session.delete(records)
    #         session.commit()
    #         session.close()
    #         print(f"Deleted user record with id: {uid} successfully!")
    #         return True
    #     except Exception as e:
    #         print("Exception occurred :", e)

    def login(self, uid, password):
        if uid is not None:
            with engine.begin() as conn:
                present_password = conn.execute(
                    select(db.Credentials.password).
                    where(db.Credentials.uid == uid)).fetchall()[0]
                print("Pass:", present_password)
                print("Decrypted Pass:", bcrypt.checkpw(password.encode('utf-8'), present_password.password))
                if present_password is None or bcrypt.checkpw(password.encode('utf-8'), present_password.password) is False:
                    return False, "", False
                record = conn.execute(select(db.User).where(db.Credentials.uid == uid)).fetchall()
                print(record)
                return True, record[0].first_name, record[0].type == "student"
        return False

    def save_to_database(self, file_name):
        users = pd.read_csv(file_name)
        try:
            users.to_sql('User', engine, if_exists='replace', index=False)
        except Exception as e:
            print("Exception occurred :", e)


user = UserCredentialCRUD()

