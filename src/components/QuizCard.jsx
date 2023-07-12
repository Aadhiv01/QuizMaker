import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './QuizCard.css'

const QuizCard = ({ title, text, imageUrl, redirectUrl }) => {
  
  const navigate = useNavigate();

  const handleRedirect = async () => {
    const response = await fetch('http://127.0.0.1:5000//quiz/students/questions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({category: title})
          });
          
    const data = await response.json();
    console.log("Data:", data);
    console.log('Questions:', data.questions);
    const no_of_questions = data.questions ? data.questions : 0;
    if (no_of_questions && title) {
      navigate(redirectUrl, { state: { no_of_questions, title } });
    }
  };

  return (
    <Card className="card">
      <Card.Img variant="top" src={imageUrl} className="card-img-top" />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">{text}</Card.Text>
        <Button variant="primary" onClick={handleRedirect}>
          Play
        </Button>
      </Card.Body>
    </Card>

  );
};

export default QuizCard;
