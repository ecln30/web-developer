
import React, { useEffect } from 'react';
import {  signInWithGoogle, logInWithEmailAndPassword,auth } from '../firebase.js'
import { Link, useNavigate } from "react-router-dom"
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

    function signGoogle() {
       signInWithGoogle(setTrigger)
    }

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
            onClick={ signGoogle }
           >Login with Google</button>
            </div>
           
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/SignUp">Register</Link> now.
        </div>

          </div>
        </div>
     ) : "" ;
}

export default Login;
















