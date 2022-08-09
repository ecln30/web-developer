
import React, { useEffect } from 'react';
import {  signInWithGoogle,auth } from '../firebase.js'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"


function Login({ email, password,HandlePassword, trigger, close, HandleEmail, HandleLogin, setTrigger }) {
    
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) navigate("/dashboard");
    }, [user, loading]);


    return (trigger) ? (
        <div className="login">
          <div className="login-container">

           <button className="close-btn"
               onClick={ close }
           > X </button>
          
           <p className="p">Email</p>
           <input className="login__textBox" type="Email" 
           value={ email } 
           onChange={ HandleEmail } />

            <p className="p">Password</p>
           <input className="login__textBox" type="password" 
            value={ password }  
            onChange={ HandlePassword } />

            <div className="buttons">

            <button className="login__btn" type="Sumit"
            onClick={ HandleLogin }
            >Log in</button>
            
           <button
            className="login__btn login__google"
            onClick={ signInWithGoogle }
           >Login with Google</button>
            </div>
           
        <div>
          <NavLink to="/reset">Forgot Password</NavLink>
        </div>
        <div>
          Don't have an account? <NavLink to="/signUp">Register</NavLink> now.
        </div>
          </div>
          {user ? setTrigger(false) : ""}
        </div>
     ) : "" ;
}

export default Login;
















