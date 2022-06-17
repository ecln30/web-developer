import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"
import Section from "./components/Section"
import Poplog from "./components/Poplog"
import {useState} from "react"

function App() {
  const [trigger, setTrigger] = useState(false)
  function login() {
     setTrigger(true)
  }

  function close() {
     setTrigger(false)
  }

  function signup() {
        console.log("Hello")
  }
  return (
    <div className="App">
      <Header login={login} signup={signup} />
      <Poplog trigger={trigger} close={close}  />

      <Main />
      <Section />
    </div>
  );
}

export default App;
