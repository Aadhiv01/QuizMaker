import React, { useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaUser, FaLock } from 'react-icons/fa';
import Alert, { Button, Modal } from 'react-bootstrap';
import Auth from './Auth';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username: username, password: password };
    const request = new Request('http://127.0.0.1:5000/quiz/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode:'cors',
      body: JSON.stringify(data)
    });
    fetch(request)
    .then(response => response.json())
    .then(data => {
      Auth.login(data)
      
      if(data['success']) {
        localStorage.setItem('user_name', data['name']);
        localStorage.setItem('student', data['student']);
        localStorage.setItem('uid', data['uid']);
        console.log("Uid: ", localStorage.getItem('uid'));
        navigate("/quizmain")
      } else {
        Auth.logout()
      }
    })
  }

  return (
    <body>
      <Navbar/>
      <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <img src='https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'></img>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="icon-input">
              <FaUser />
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="icon-input">
              <FaLock />
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>
        <p className="signup-link">New User? <Link to="/signup" className='link'>Sign up</Link></p>
      </form>
      {!message && (
        <div className='alert-container'>
          {/* <Alert variant="danger" onClose={() => {
            window.location.reload();
          }} dismissible closeLabel="Close">
            <Alert.Heading>
              Invalid credentials! Please try again!
            </Alert.Heading>
          </Alert> */}
          <Modal>
            <Modal.Header closeButton>
              <Modal.Title>Invalid Credentials! Try Again!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => window.location.reload()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  </body>
  );
}

export default Login;
