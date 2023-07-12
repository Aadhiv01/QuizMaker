import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import SignupPage from './SignUpPage';
import QuizMain from './QuizMain';
import Programming from './Categories/Programming';
import CurrentResults from './CurrentResults';
import ScoresHistory from './ScoresHistory';
import './App.css';
import Particle from './Particle';

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
