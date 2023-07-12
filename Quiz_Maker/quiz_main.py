# import random
# import quiz_set as quiz
# import quiz_user as student
# import quiz_result as result
#
#
# class Quiz_Menu:
#
#     def menu_interaction(self):
#         print("Hi! Welcome to our Quiz_Master")
#         while True:
#             option = int(input(
#                 "Please select your choice: 1. Student Operations\t2. Question Set Operations\t3. Result Set Operations\t4. Play the quiz\t5. Exit  : "))
#
#             #Performs student_CRUD_operations
#             if option == 1:
#                 student_option = int(input("Please select your choice: 1. Create Student\t2. View Student(s)\t3. Update Student Details\t4. Delete Student\t5. Exit : "))
#                 if student_option == 1:
#                     uid = input("Enter UId: ")
#                     name = input("Enter name: ")
#                     student.StudentCRUD().create_student(uid, name)
#                 elif student_option == 2:
#                     choice = int(input("1. View a Student\t2. View all students"))
#                     if choice == 1:
#                         uid = input("Enter student uid to view: ")
#                         print(student.StudentCRUD().read_student(uid))
#                     else:
#                         print(student.StudentCRUD().read_student())
#                 elif student_option == 3:
#                     uid = input("Enter UId to update: ")
#                     name = input("Enter new name: ")
#                     student.StudentCRUD().update_student(uid, name)
#                 elif student_option == 4:
#                     uid = input("Enter UId to delete: ")
#                     student.StudentCRUD().delete_student(uid)
#                 else:
#                     continue
#
#             #Performs question_set_CRUD_operations
#             elif option == 2:
#                 question_option = int(input("Please select your choice: 1. Create Question\t2. View Question(s)\t3. Update Question Details\t4. Delete Question\t5. Exit :"))
#                 if question_option == 1:
#                     question = input("Enter the question: ")
#                     answer = input("Enter the answer: ")
#                     quiz.QuestionCRUD().create_question(question, answer)
#                 elif question_option == 2:
#                     choice = int(input("1. View a Question\t2. View all Question(s)"))
#                     if choice == 1:
#                         question_id = int(input("Enter the question_id to view: "))
#                         print(quiz.QuestionCRUD().read_question(question_id))
#                     else:
#                         print(quiz.QuestionCRUD().read_question())
#                 elif question_option == 3:
#                     question_id = int(input("Enter question_id to update: "))
#                     question = input("Enter the question to update: ")
#                     answer = input("Enter the answer to update: ")
#                     quiz.QuestionCRUD().update_question(question_id, question, answer)
#                 elif question_option == 4:
#                     question_id = input("Enter question_id to delete: ")
#                     quiz.QuestionCRUD().delete_question(question_id)
#                 else:
#                     continue
#
#             #Performs_Result_CRUD_operations
#             elif option == 3:
#                 result_option = int(input(
#                     "Please select your choice: 1. View Result(s)\t2. Update Result Details\t3. Delete Result\t4. Exit :"))
#                 if result_option == 1:
#                     choice = int(input("1. View a student's result(s)\t2. View all students' results(s) :"))
#                     if choice == 1:
#                         student_id = input("Enter the student_id to view: ")
#                         print(result.ResultCRUD().read_quiz_result(student_id))
#                     else:
#                         print(result.ResultCRUD().read_quiz_result())
#                 elif result_option == 2:
#                     result_id = int(input("Enter the result id to update: "))
#                     score = input("Enter the score to update: ")
#                     result.ResultCRUD().update_quiz_result(result_id, score)
#                 elif result_option == 3:
#                     student_id = input("Enter student_id to delete: ")
#                     result.ResultCRUD().delete_quiz_result(student_id)
#                 else:
#                     continue
#
#             #Playing the Quiz_master
#             elif option == 4:
#                 print("Lets play the quiz!!!!")
#                 student_id = input("Please enter your student id: ")
#                 student_details = student.StudentCRUD().read_student(student_id)
#                 if student_details is None:
#                     print("Student not found in record!")
#                     continue
#                 print(f"Student id : {student_details[0]}\nStudent name : {student_details[1]}")
#                 no_of_questions = int(input("Enter the number of questions you want to take: "))
#                 question_set_size = quiz.QuestionCRUD().get_no_of_questions()
#                 print("Question size: ", question_set_size)
#                 question_set = []
#                 no_of_correct_answers = 0
#                 for i in range(no_of_questions):
#                     question_id = 0
#                     while question_id not in question_set:
#                         question_id = random.randint(1, question_set_size)
#                         question_set.append(question_id)
#                     answer_key = quiz.QuestionCRUD().read_question(question_id)
#                     print(f"Question {i + 1}: ", answer_key[1])
#                     answer = input("Enter your answer: ")
#                     if answer_key[2] == answer:
#                         print("Kudos!! Correct Answer")
#                         no_of_correct_answers += 1
#                     else:
#                         print("Sorry! Incorrect Answer")
#                 score = int((no_of_correct_answers / no_of_questions) * 100)
#                 result.ResultCRUD().create_quiz_result(student_id, score)
#                 print("Final score : ", score)
#                 print("Thank you for playing the quiz!!")
#             else:
#                 print("See ya!!!! Next Time")
#                 break
#
# if __name__ == "__main__":
#     Quiz_Menu().menu_interaction()
