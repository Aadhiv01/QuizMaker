from sqlalchemy import create_engine, Column, Integer, String, QueuePool, UniqueConstraint, ForeignKey, DateTime, Float, \
    MetaData
from sqlalchemy.orm import sessionmaker, relationship, declarative_base
from contextlib import contextmanager

Base = declarative_base()


class Questions(Base):
    __tablename__ = "Questions"
    question_id = Column(Integer, primary_key=True, autoincrement=True)
    question = Column(String)
    answer = Column(String)
    category = Column(String)
    __table_args__ = (UniqueConstraint('question_id'),)


class User(Base):
    __tablename__ = "User"
    uid = Column(String, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    type = Column(String)
    children1 = relationship("Credentials", backref="User1")
    children2 = relationship("Results", backref="User2")
    __table_args__ = (UniqueConstraint('uid'),)


class Credentials(Base):
    __tablename__ = "Credentials"
    credential_id = Column(Integer, primary_key=True, autoincrement=True)
    uid = Column(String, ForeignKey("User.uid"))
    password = Column(String)
    date = Column(DateTime)
    credentials = relationship(User)
    __table_args__ = (UniqueConstraint('credential_id'),)


class Results(Base):

    __tablename__ = "Results"
    result_id = Column(Integer, primary_key=True, autoincrement=True)
    uid = Column(String, ForeignKey("User.uid"))
    student_name = Column(String)
    category = Column(String)
    percentage_score = Column(Float)
    date = Column(DateTime)
    results = relationship(User)
    __table_args__ = (UniqueConstraint('result_id'),)


engine = create_engine('sqlite:///quiz_master.sqlite', echo=True, poolclass=QueuePool, connect_args={'timeout': 150})

Base.metadata.create_all(bind=engine)


