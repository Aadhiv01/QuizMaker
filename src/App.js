import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import SignupPage from './components/SignUpPage';
import QuizMain from './components/QuizMain';
import Programming from './components/Categories/Programming';
import CurrentResults from './components/CurrentResults';
import ScoresHistory from './components/ScoresHistory';
import Particle from './components/Particle';
import './App.css';


function App() {

  return (
    <div className="App" > 
      <Particle id="tsparticles" />
      <div className="content">
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/quizmain" element={<QuizMain/>}/>
            <Route path='/programming' element={<Programming/>} />
            <Route path='/currentresults' element={<CurrentResults/>} />
            <Route path='/resulthistory' element={<ScoresHistory/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
