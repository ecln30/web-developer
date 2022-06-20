import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"
import Section from "./components/Section"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {useState} from "react"

function App() {
  const [trigger, setTrigger] = useState(false)
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const emailRegex = /\S+@\S+\.\S+/;
  function login() {
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

  function handleLogin() {
  }

  

  function handleSignUp() {
     console.log("sign up")
  }

  return (
    <div className="App">
      <Header login={login} signup={signup} />
      <Login
        validateEmail={validateEmail}
        handleLogin={handleLogin}
        isValid={isValid}
        getEmail={getEmail}
        message={message}
        trigger={trigger} close={close}  />
      <SignUp 
        handleSignUp={handleSignUp}
        show={show} close={close}
      />
      <Main />
      <Section />
    </div>
  );
}

export default App;
