













import React, { useState} from 'react'
import {db, auth} from "../firebase"
import {  updateDoc,  serverTimestamp, collection} from "firebase/firestore"
import { Input, Button } from '@mui/material';
   
function Sendmessage() {
  const [msg, setMsg] = useState("")

  async function sendMessage(e) {
       e.preventDefault()
       const {uid, photoURL} = auth.currentUser
       const getMsg = collection( db, "messages")
       await updateDoc( getMsg ,{ 
              text: msg,
              photoURL,
              uid,
              timestamp:  serverTimestamp()
       })
      console.log()
      setMsg('')
  }
  return (
    
    <div>
      <form onSubmit={ sendMessage }  >
      <Input
          type="text"
          value={ msg }
          onChange={ e => setMsg(e.target.value)}
          className="userInput"
          placeholder='Message'
        />
        <Button 
        type="submit"
        className="send">send</Button>
      </form>
    </div>
  )
}

export default Sendmessage

































