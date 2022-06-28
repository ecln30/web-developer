













import React from 'react';
import {  signInWithGoogle } from '../firebase.js'
import {Button} from '@mui/material'

function logIn({email, password, handlePassword, trigger, close,  isValid, message, validateEmail, InOut}) {
        
    return (trigger) ? (
        <div className="log-in">
           <button className="close-btn"
               onClick={close}
           > X </button>
           <div className={`message ${isValid ? 'success' : 'error'}`}>
            {message}
           </div>
           <p>Email Address</p>
           <input className="user email" type="Email"  onChange={ validateEmail} />
           <p>Password</p>
           <input className="user password" type="text" value={ password }  
            onChange={ handlePassword } />
            <button className="submit login" type="Sumit"
            >Log in</button>
            <hr />
           <Button 
            onClick={ signInWithGoogle }
           >Sign In With Google</Button>
        </div>
     ) : "" ;
}

export default logIn;
















