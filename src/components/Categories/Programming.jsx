import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";

function Programming() {

    const [user_questions, setUserQuestions] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const { no_of_questions = 0, title = "" } = location.state || {};
    
    const handleStart = async (event) => {
        setQuizStarted(true);
        event.preventDefault();

        if(title){

          const request = await fetch('http://127.0.0.1:5000//quiz/students/play', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({category: title, no_of_questions: user_questions})
          });
          const data = await request.json();
          console.log("Questions:",data['question_set']);
          setQuestions(data['question_set']);
        }
    }

    // const handleNextQuestion = async (event) => {
    //     if (currentIndex < questions.length - 1) {
    //         setCurrentIndex(currentIndex => currentIndex + 1);
    //         setUserAnswer('');
    //       } else {
    //         setIsSubmitting(true);
    //         event.preventDefault();
    //         const request = await fetch('http://127.0.0.1:5000//quiz/students/results', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({category: 'programming', correct: {correct}, uid: localStorage.getItem('uid')})
    //         });
    //         fetch(request)
    //         .then(response => response.json())
    //         .then(data => {
    //             navigate("/currentresults", { state: { questions, answers, correct } });
    //         })
    //       }
    // };

    useEffect(() => {
        if (questions && questions.length > 0) {
            setCurrentQuestion(questions[currentIndex]?.[0]);
            setCurrentAnswer(questions[currentIndex]?.[1]);
            console.log("Questions length: ", questions.length);
        }
    }, [currentIndex, questions]);

    useEffect(() => {
      console.log("User answers: ", answers);
      let presentanswers = answers;
      setAnswers(answers);
  }, [answers]);

    useEffect(() => {
      console.log("Correct count: ", correct);
      let correctCount = correct;
      setCorrect(correctCount);
  }, [correct]);

    useEffect(() => {
      if(isSubmitting && answers.length == questions.length)
        submitResults();
  }, [isSubmitting]);

    const submitResults = () => {
      const score = ((correct / user_questions) * 100).toFixed(2);
      fetch('http://127.0.0.1:5000/quiz/students/results/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: title, score: score, uid: localStorage.getItem('uid')})
        }).then(response => response.json())
        .then(data => {
          console.log("Pr questions: ", questions);
          console.log("Pr answers: ", answers);
          console.log("Pr correct: ", correct);
          navigate("/currentresults", { state: { question_set: questions, user_answers: answers, correct: correct } });
        });
    }

    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        const updatedAnswers = [...answers, userAnswer];
        setAnswers(updatedAnswers);
        if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
          alert('Correct!');
          setCorrect(correct => correct + 1);
          console.log("Correct : ", correct); 
        } else {
          alert('Incorrect!');
        }

        if (currentIndex < questions.length - 1) {
          setCurrentIndex(index => index + 1);
          setUserAnswer('');
        } else {
          setIsSubmitting(true);
          submitResults(updatedAnswers);
        }
      };
      

    return (
        <>
            <Navbar/>
            {!quizStarted ? (
            <div className="quiz-container" style={{'fontSize': '50px',
                                                    'fontWeight': '600',
                                                    'color': '#ffffff',
                                                    'textShadow': '0px 0px 5px #93a9d3, 0px 0px 10px #93a1d3, 0px 0px 10px #93aad3, 0px 0px 20px #939fd3',
                                                    'textAlign': 'center',
                                                    'padding': '4px'}}>
              <h2>Select number of questions for the quiz</h2>
              <input
                type="number"
                value={user_questions}
                min="1"
                max={no_of_questions}
                onChange={(e) => setUserQuestions(parseInt(e.target.value))}
                onKeyPress={(e) => {
                  const maxValue = parseInt(e.target.max);
                  const enteredValue = parseInt(e.target.value + e.key);
                  if (enteredValue > maxValue) {
                    e.preventDefault();
                  }
                }}
                style={{'width': '10%',
                        'margin': '0 auto',
                        'display': 'block',
                        'textAlign': 'center',
                        'fontSize': '20px',
                        'fontWeight': '400'
                      }}
              />
              <button type="button" class="btn btn-primary" onClick={handleStart}>Start</button>
            </div>
        ) : (
            <div className="quiz-play-container" style={{'fontSize': '50px',
                                                          'fontWeight': '600',
                                                          'color': '#ffffff',
                                                          'textShadow': '0px 0px 5px #93a9d3, 0px 0px 10px #93a1d3, 0px 0px 10px #93aad3, 0px 0px 20px #939fd3',
                                                          'textAlign': 'center',
                                                          'padding': '8px',
                                                          'margin': '0 auto',
                                                          'display': 'flex',
                                                          'flexDirection': 'column',
                                                          'alignItems': 'center',
                                                          'justifyContent': 'center',
                                                          'height': '100vh'}}
            >
            <h2>{currentQuestion}</h2>
            <form onSubmit={handleSubmitAnswer}>
                <input
                type="text"
                placeholder="Enter your answer"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                style={{'width': '100%',
                        'margin': '0 auto',
                        'display': 'block',
                        'textAlign': 'center',
                        'fontSize': '20px',
                        'fontWeight': '400'
                      }}
                />
                <br></br>
                <button type="submit">Submit Answer</button>
            </form>
            </div>
            )}
        </>
    )

}

export default Programming;