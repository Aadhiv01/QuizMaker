import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Auth from "./Auth";
import './Navbar.css'
import { useDispatch } from 'react-redux'

export default function Navbar() {

  const dispatch = useDispatch();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsNavCollapsed(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navigation">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavCollapsed ? 'show' : ''}`}>
          {localStorage.getItem('login_token') ?
            <NavLink className="navbar-brand" to="/">
              Welcome, {localStorage.getItem('user_name')}
            </NavLink>
          : <NavLink className="navbar-brand" to="/">
              Quiz Master
            </NavLink>
          }
          <div className="navbar-elements ml-auto">
            <ul className="navbar-nav">
            {localStorage.getItem('login_token') ? (
              localStorage.getItem('professor_token') ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/students'}>
                      Class Scores
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/quizmain'}>
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/resulthistory'}>
                      Scores History
                    </NavLink>
                  </li>
                </ul>
              )
            ) : (
              <></>
            )}
              {localStorage.getItem('login_token') ?
                <li className="nav-item">
                  <NavLink className="nav-link" to={'/'} 
                    onClick={() => {
                        Auth.logout()
                      }
                    } >
                    Logout
                  </NavLink>
                </li>
              : <li className="nav-item">
                  <NavLink className="nav-link" to={'/'}>
                      Login
                  </NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  );
}
