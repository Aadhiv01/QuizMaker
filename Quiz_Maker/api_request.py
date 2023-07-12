import requests

url = 'http://127.0.0.1:5000/quiz/students'
# username = input("Please enter username: ")
# password = input("Please enter password: ")
# data = {'username': username, 'password': password}
data = ""

response = requests.post(url, json=data)

if response.ok:
    print(response.json())
else:
    print(response.status_code)
