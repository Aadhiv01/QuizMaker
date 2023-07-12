from flask import Flask, request, jsonify
from flask_cors import CORS

import quiz_questions
import quiz_result
import quiz_user
from quiz_questions import QuestionsCRUD
from quiz_user import UserCredentialCRUD
from quiz_result import ResultCRUD

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

user, questions, result = quiz_user.user, quiz_questions.questions, quiz_result.result


@app.route('/quiz/students', methods=['POST'])
def get_user():
    uid = request.json['username']
    password = request.json['password']
    print(uid, password)
    flag, name, isStudent = user.login(uid, password)
    print("Flag:", flag, isStudent)

    return jsonify({'success': flag, 'name': name, 'student': isStudent, 'uid': uid})


@app.route('/quiz/students/signup', methods=['POST'])
def user_signup():
    print(request.json)
    flag = user.create_user(request.json['uid'], request.json['firstname'], request.json['lastname'], request.json['type'], request.json['password'])
    return jsonify({'success': flag})


@app.route('/quiz/students/questions', methods=['POST'])
def total_questions():
    print(request.json)
    no_of_questions = questions.questions_count(request.json['category'])
    return jsonify({'questions': no_of_questions})


@app.route('/quiz/admin/question/insert', methods=['POST'])
def insert_question():
    print(request.json)
    flag = questions.create_question_set(request.json['question'], request.json['answer'], request.json['category'])
    return jsonify({'success': flag})

@app.route('/quiz/students/play', methods=['POST'])
def play_quiz():
    print("\n\nPlay Quiz:", request.json)
    values = []
    question_set = {}
    question_set = questions.play_quiz(request.json['no_of_questions'], request.json['category'])
    if question_set:
        values = [list(v) for v in question_set.values()]
    print("Values:", jsonify({'question_set': values}))
    return jsonify({'question_set': values})


@app.route('/quiz/students/results/insert', methods=['POST'])
def store_results():
    print("New Result:", request.json)
    flag = result.create_quiz_result(request.json['uid'], request.json['category'], request.json['score'])
    return jsonify({'success': flag})


@app.route('/quiz/student/result/history', methods=['POST'])
def fetch_results():
    result_set = result.fetch_student_result_history(request.json['uid'])
    result_set = [list(i) for i in result_set]
    print("Result set:", list(result_set))
    return jsonify({'result_set': list(result_set)})
