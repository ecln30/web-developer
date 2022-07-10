import React, { useState, useEffect} from 'react'
import {  query,collection, onSnapshot,limit, orderBy} from "firebase/firestore"
import { db, auth, logout, signInWithGoogle} from "../firebase"
import Sendmessage from "./Sendmessage"
import Logout from "./Logout"

function Chat({ setIsTrue}) {
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
     setIsTrue(false)
  }

  return (
    
    <div className={ `chat ${ isClose ? "hide" : ""}`}>
      <div className="Head">
           <div className="Invisible"> <Logout /></div>
           <button className="hid" onClick={closeChat}> X </button>
      </div>
       <p className="greeting">what can I help you</p>
      <div className="msgs">
       { messages.map(({ id, text, photoURL, uid }) => (
          <div>
            <div key={id} className={`msg ${uid == auth.currentUser.uid ? "sent" : "received"}`}>
              <p className="chatP">{ text }</p>
              <img className="idImg" src={ uid == auth.currentUser.uid ? "" : photoURL } alt="" />
            </div>
          </div>
       ))}
       </div>
       <Sendmessage />
     </div>
  ) 
}

export default Chat