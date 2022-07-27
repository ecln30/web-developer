













import React, { useState} from 'react'
import {db, auth} from "../firebase"
import {  query, addDoc,  serverTimestamp, collection, orderBy} from "firebase/firestore"
import { Input, Button } from '@mui/material';
   
function Sendmessage() {
  const [msg, setMsg] = useState("")

  async function sendMessage(e) {
       e.preventDefault()
       const {uid, photoURL} = auth.currentUser
       const Msg = collection( db, "messages")
       await addDoc( Msg ,{ 
              text: msg,
              photoURL,
              uid,
              createdAt:  serverTimestamp()
       })
      console.log()
      setMsg('')
  }
  return (
    
    <div className="onMsg">
      <form onSubmit={sendMessage}>
      <Input
       style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} 
          type="text"
          value={ msg }
          onChange={ e => setMsg(e.target.value)}
          className="userInput"
          placeholder='Message'
        />
        <Button
        style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}}
        type="submit"
        className="send">send</Button>
      </form>
    </div>
  )
}

export default Sendmessage

































