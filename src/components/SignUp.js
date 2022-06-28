













import React from "react"


function SignUp({email, handleEmail, password, handlePassword, show, close, firstname, handleSignUp}) {
   
    return (show) ? (
        <div className="sign-up">
           <button className="close-btn"
               onClick={close}
           > X </button>
           <p>First Name</p>
           <input className="user firstname" type="text" vlaue={ firstname }  />
           <p className="textE">Email</p>
           <input className="user email" type="Email" value={ email } onChange={ handleEmail } />
           <p className='txtP'>Password</p>
           <input className="user password" type="text" value={ password }
             
             onChange={ handlePassword } />
           <button 
             onClick={ handleSignUp }
           className="submit sign" type="Sumit">Sign UP</button>
        </div>
     ) : "" ;

 }

export default SignUp
















































