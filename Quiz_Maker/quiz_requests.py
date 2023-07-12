import requests

data = {"category": "Programming", "uid": "u1424804", "score": 50}
url = "http://127.0.0.1:5000/quiz/student/result/history"

response = requests.post(url=url, json=data)
#response = requests.post(url, json=data).json()

if response:
    print(response)
else:
    print("Post Unsuccessful")
