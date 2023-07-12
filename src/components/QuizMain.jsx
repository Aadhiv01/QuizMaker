import React from 'react'
import Navbar from './Navbar';
import QuizCard from './QuizCard';
import './QuizMain.css'

const QuizMain = () => {
  return (
    <>
      <Navbar/>
      <header>
        <h2>Select a Category to take the quiz</h2>
      </header>
      <div className='card-container'>
        <QuizCard
          title="Programming"
          text="Try your luck in taking a quiz on programming to test how technically sound your knowledge is"
          imageUrl="https://www.zdnet.com/a/img/resize/0a6b0be2f543ddbf313fc83a706b807b77c3c202/2021/07/19/8a337c80-5ed6-43a1-98fb-b981d420890f/programming-languages-shutterstock-1680857539.jpg?auto=webp&fit=crop&height=900&width=1200"
          redirectUrl="/programming"
        />
        <QuizCard
          title="Networking"
          text="Try your luck in taking a quiz on networking and test if your brain is wired correctly"
          imageUrl="https://www.n-able.com/wp-content/uploads/blog/2019/01/whatis.jpg"
          redirectUrl="/networks"
        />
        <QuizCard
          title="Databases"
          text="Try your luck in taking a quiz on databases and test if data is stored appropraitely in your brain"
          imageUrl="https://static8.depositphotos.com/1057263/814/i/950/depositphotos_8145342-stock-photo-database-table.jpg"
          redirectUrl="/database"
        />
      </div>
    </>
  )
}

export default QuizMain;
