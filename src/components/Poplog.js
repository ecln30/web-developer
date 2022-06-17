













import React from 'react';


function Poplog({email, handleEmail, password, handlePassword,trigger, close}) {
    return (trigger) ? (
        <div className="Log-in">
        <button className="close-btn"
        onClick={close}
        >close</button>
           <p htmlFor="email">Email</p>
           <input type="Email" placeholder="Enter Email" value={email} onChange={handleEmail} />
           <p htmlFor="password">Password</p>
           <input type="text" value={ password } onChange={ handlePassword } />
        </div>
     ) : "" ;
}

export default Poplog;
















