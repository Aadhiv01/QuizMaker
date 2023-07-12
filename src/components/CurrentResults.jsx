import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Check, X } from 'react-bootstrap-icons';
import 'react-circular-progressbar/dist/styles.css';

import './CurrentResults.css';

import Navbar from "./Navbar";


function CurrentResults() {

    const navigate = useNavigate();
    const location = useLocation();
    const { question_set, user_answers, correct } = location.state;

    const handleHome = () => {
        navigate("/quizmain");
    }

    const calculateScore = () => {
        if (location.state.correct && location.state.user_answers && location.state.user_answers.length) {
          console.log("User answers length cr: ", location.state.user_answers);
          return parseFloat(((location.state.correct / location.state.user_answers.length) * 100).toFixed(2));
        }
        return 'N/A';
      };
    
      const isAnswerCorrect = (index) => {
        const userAnswer = location.state.user_answers[index];
        const correctAnswer = location.state.question_set[index][1];
        return userAnswer === correctAnswer;
      };
    
      const getAnswerContainerStyle = (index) => {
        const backgroundColor = isAnswerCorrect(index) ? 'rgba(99, 179, 114, 0.6)' : 'rgba(162, 76, 76, 0.6)';
        const fontColor = isAnswerCorrect(index) ? 'rgba(35, 106, 47, 1)' : 'rgba(158, 23, 23, 1)';
        const answerLength = location.state.user_answers[index].length;
        const width = location.state.question_set[index][0].length * 7.2;
        const containerOpacity = 0.6;

        return {
          backgroundColor,
          width: '580px',
          borderRadius: '5px',
          color: `${fontColor}`,
          height: '32px',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        };
      };

    useEffect(() => {
        if (location.state) {
          console.log('question_set:', location.state.question_set);
          console.log('user_answers:', location.state.user_answers);
        }
      }, [location.state]);

    return (
        <>
            <Navbar/>
            <div className="result-container">
                <h3>Final Results</h3>
                {location.state.question_set && location.state.user_answers && location.state.correct && (
                    <>
                    <h2>You scored {calculateScore()}%</h2>
                    <br></br><br></br>
                    <ul class="list-group">
                        {location.state.question_set && location.state.user_answers && location.state.question_set.map((question, index) => (
                        <li class="list-group-item" key={index}>
                            <h5>Question {index + 1}.</h5>
                            {question[0]}
                            <h5>Your Answer:  
                                <span>
                                  <div style={getAnswerContainerStyle(index)}>
                                  {isAnswerCorrect(index) ? <Check color="green" size={20} /> : <X color="rgba(158, 23, 23, 1)" size={20} />}  {location.state.user_answers[index]}
                                  </div>
                                </span>
                            </h5>
                            {!isAnswerCorrect(index) && (
                            <>
                                <h5>Correct Answer:
                                  <div style={{'color': 'rgba(35, 106, 47, 1)',
                                              'backgroundColor': 'rgba(99, 179, 114, 0.6)', 
                                              'width': '580px',
                                              'borderRadius': '5px',
                                              'height': '32px',
                                              'padding': '4px',
                                              'display': 'flex',
                                              'alignItems': 'center',
                                              }}>
                                    <Check color="green" size={20} />  {location.state.question_set[index][1]}
                                  </div>
                                </h5>
                            </>
                            )}
                        </li>
                        ))}
                    </ul>
                    <br></br>
              <div className="progressbar-container" style={{ width: '200px', height: '200px', alignSelf: 'center' }}>
                      <CircularProgressbar
                        value={calculateScore()}
                        text={`${calculateScore()}%`}
                        strokeWidth={10}
                        styles={{
                          path: {
                            stroke: `rgba(62, 152, 199, ${calculateScore() / 100})`,
                            strokeLinecap: 'butt',
                            transformOrigin: 'center center',
                          },
                          trail: {
                            stroke: '#d6d6d6',
                          },
                          text: {
                            fill: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                          }
                        }}
                        />
                    </div>
                    <button type="button" class="btn btn-primary" onClick={handleHome}>Back to Home</button>
                    </>
                )}
            </div>
        </>
    )

}

export default CurrentResults;