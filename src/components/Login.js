













import React from 'react';


function logIn({email, password, handlePassword, trigger, close, handleLogin, isValid, message, validateEmail}) {
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
               onClick={handleLogin}
            >Log in</button>
        </div>
     ) : "" ;
}

export default logIn;
















