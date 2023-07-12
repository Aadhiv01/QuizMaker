import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaUser, FaLock } from 'react-icons/fa';
import './SignupPage.css'

function Login() {
  const [uid, setUId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const [usertype, setUserType] = useState("");
  const [message, setMessage] = useState('')
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const checkPassword = (e) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[^\da-zA-Z]).{8,}$/;
    setIsValid(regex.test(password))
    setPassword(e.target.value)
  }

  const checkPasswordMatch = (e) => {
    if (password == "") {
      setPasswordConfirm("")
      return;
    }
    if (passwordconfirm == "") {
      setMessage("")
    }
    setPasswordConfirm(e.target.value)
    if (e.target.value == password) {
      setMessage("Passwords Match")
    } else {
      setMessage('Passwords don\'t match')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password != passwordconfirm) {
        return;
    } 
    const names = username.split(" ")
    const data = {
      uid: uid,
      firstname: names[0],
      lastname: names.slice(1).join(" "),
      type: usertype,
      password: password,
    };
    const response = await fetch('http://127.0.0.1:5000///quiz/students/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    navigate("/")
  }

  return (
    <body>
      <Navbar/>
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SignUp</h2>
        <img src='https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'></img>
        <div className="form-group">
          <label htmlFor="userid">UId</label>
          <div className="icon-input">
              <FaUser />
              <input type="text" id="userid" placeholder='Enter your UId' value={uid} onChange={(e) => setUId(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <div className="icon-input">
              <FaUser />
              <input type="text" id="username" placeholder='Enter your full name' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor='type'>Type</label>
          <select onChange={(e) => setUserType(e.target.value)} id="type">
            <option value="">Select an user type</option>
            <option value="professor">Professor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <div className="icon-input">
              <FaLock />
              <input type="password" id="password1" placeholder='Enter your password' value={password} onChange={checkPassword} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <div className="icon-input">
              <FaLock />
              <input type="password" id="password2" placeholder='Re-Enter your password' value={passwordconfirm} onChange={checkPasswordMatch} />
          </div>
          {!isValid && <p>Your password must have at least one uppercase letter, one lowercase letter, one special character, and a length of at least 8 characters.</p>}
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="btn btn-primary">Submit</button>
        <br/>
        <p className="signup-link">Existing User? <Link to="/" className='link'>Login</Link></p>
      </form>
    </div>
  </body>
  );
}

export default Login;
