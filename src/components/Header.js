













import React from 'react';
import Logout from "./Logout"
import Login from "./Login"
import Menu from './Sidebar'
import {  signInWithGoogle, logout } from "../firebase.js"

function Header({handlelog, signup, user}) {
    return ( 
        <nav>
         <h1>Web world</h1>
         <div className="auth">
           <p className={`log Login ${ user && signInWithGoogle ? "hide" : "show" }`}
           onClick={handlelog}
           >
            { "Login" }
           </p> 
           <p className={`log Signup ${ user && signInWithGoogle ? "hide" : "show"}` }
            onClick={signup}
           >sign up</p>
         </div>
        </nav>
     );
}

export default Header;





























































































































































































































