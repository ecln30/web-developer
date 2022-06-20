













import React from 'react';


function Header({login, signup}) {
    return ( 
        <nav>
         <h1>Web world</h1>
         <div className="auth">
           <p className="log Login"
            onClick={login}
           > Log in</p> 
           <p className="log Signup"
            onClick={signup}
           >sign up</p>
         </div>
        </nav>
     );
}

export default Header;




























































































































































































































