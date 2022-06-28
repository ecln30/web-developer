import './App.css';
import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Section from "./components/Section"
import Login from "./components/Login"
import Logout from "./components/Logout"
import SignUp from "./components/SignUp"
import Chat from "./components/Chat"
import {useState} from "react"
import { auth, signInWithGoogle, logout } from "./firebase.js"
import {useAuthState} from "react-firebase-hooks/auth"
import { setRef} from '@mui/material';

function App() {
  const [trigger, setTrigger] = useState(false)
  const [user] = useAuthState(auth)
  const [email, setEmail] = useState("")
  const [isTrue, setIsTrue] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const emailRegex = /\S+@\S+\.\S+/;

  function handlelog() {
     setTrigger(true)
     
  }

  function signup() {
     setShow(true)
  }

  function close() {
     setTrigger(false)
     setShow(false)
  }

 function validateEmail(e) {
     const email = e.target.value
     if (emailRegex.test(email)) {
         setIsValid(true)
         setMessage("")
     } else {
        setIsValid(false)
     }
  }

  function getEmail(e) {
       setEmail(e.target.value)
  }

  function handleSignUp() {
     console.log("sign up")
  }

  function handleChat() {
      if (signInWithGoogle) {

        console.log(" welcom chat")
        setIsTrue(true)
      }
  }

  return (
    <div className="App">
      <Header
        close={close}
        handlelog={ handlelog } 
        signup={signup} />
      <Login
        validateEmail={validateEmail}
        isValid={isValid}
        getEmail={getEmail}
        user={user}
        message={message}
        email={email}
        trigger={trigger} close={close}  />
      <SignUp 
        handleSignUp={handleSignUp}
        show={show} close={close}
      />

      <Main />
      <Section />
      <div>
         <img className={`chatIcon `} src="https://aspireinternetdesign.com/cms/wp-content/uploads/2014/12/benefits-of-live-chat-on-website.jpg" alt="" 

          onClick={handleChat}
         />
      </div>

      {isTrue ? <Chat  /> : ""}
    </div>
  );
}

export default App;
