import './App.css';
import React, { useState, useEffect } from "react"
import {  Route,  Routes} from "react-router-dom";
import Header from "./components/Header"
import Main from "./components/Main"
import Section from "./components/Section"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Signup from "./components/SignUp"
import Reset from "./components/Reset"
import toast, { Toaster } from "react-hot-toast";
import Chat from "./components/Chat"
import { auth, logout, logInEnP, signInWithGoogle,  onAuthStateChanged , registerEnP} from "./firebase.js"
import {useAuthState} from "react-firebase-hooks/auth"
import { setRef , Button} from '@mui/material';

function App() {
  const [trigger, setTrigger] = useState(false)
  const [user] = useAuthState(auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isTrue, setIsTrue] = useState(false)
  const [show, setShow] = useState(false)

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

 function HandleEmail(e) {
      setEmail(e.target.value)
  }

 function HandlePassword(e) {
     setPassword(e.target.value)
 }

 function HandleLogin() {
  if (!email) {
      alert("Please Enter Email")
  } else if(!password) {
      alert("Please Enter Password")
  } else if (email && password) {
      logInEnP(email, password, setTrigger)
  }
}

const notify = () => toast("Please Login",  {
  style: {
    border: '1px solid black',
    color: "skyblue"
  },
});

  function handleChat() {
    auth.currentUser == null ?
    notify() : setIsTrue(true)
    
  }


  return (
    <div className="App">
      <Header
        close={close}
        user={user}
        signup={signup} 
        handlelog={ handlelog } />

      <Login
      HandleEmail={ HandleEmail }
      HandlePassword={ HandlePassword }
      HandleLogin={ HandleLogin }
      setTrigger={ setTrigger }
      user={user}
      email={ email }
      password={password}
      trigger={trigger} 
      close={close}  />
   
      <Signup 
        setTrigger={setTrigger}
        setShow={setShow}
        show={ show } 
        close={ close }
      />
       
       <Reset
           email={ email }
           setEmail={ setEmail }
           close={close}
           />

        <Routes>
          <Route  path="/" element={ <Login /> } />
          <Route  path="/signup" element={ <Signup />} />
          <Route  path="/reset" element={ <Reset /> } />
        </Routes>
      
      <Main />
      <Section />
     <div>
      <Toaster  
          containerStyle={{
                position: "fixed",
                top: 500,
                right: -500,
           }}
      />
      <img className="chatIcon" src="https://aspireinternetdesign.com/cms/wp-content/uploads/2014/12/benefits-of-live-chat-on-website.jpg" alt="" 

          onClick={ handleChat }
         />
      </div> 
      { isTrue ?  <Chat setIsTrue={ setIsTrue } /> : "" }
    {user ? <Logout /> : " "}
    </div>
  );
}

export default App
