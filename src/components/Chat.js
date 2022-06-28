import React, { useState, useEffect} from 'react'
import {  query,collection, getDocs, orderBy, where, onSnapshot,limit} from "firebase/firestore"
import { db, logout, signInWithGoogle} from "../firebase"
import Sendmessage from "./Sendmessage"
import Logout from "./Logout"

function Chat() {
  const [messages, setMessages] = useState([])
  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    const con = query( collection(db, "messages"), limit(50))
    onSnapshot(con, ( snapshot => {
       setMessages(snapshot.docs.map(doc => doc.data()))
    }))
  }, [])

  function closeChat() {
     setIsClose(true)
  }

  return (
    <div className={ `chat ${ isClose ? "hide" : ""}`}>
           <button className="hid" onClick={closeChat}> X </button>
       <p>what can I help you</p>
     
       { messages.map(({ id, text, photoURL }) => (
          <div key={id}>
            <img src={ photoURL } alt="" />
            <p>{ text }</p>
          </div>
       ))}
       <Sendmessage />
     </div>
  )
}

export default Chat