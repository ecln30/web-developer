import React, { useState } from 'react'
import { db, auth, uploadChatImage } from "../firebase"
import { addDoc, serverTimestamp, collection } from "firebase/firestore"
import { Input, Button, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Camera from "./Camera"

function Sendmessage() {
  const [msg, setMsg] = useState("")
  const [showCamera, setShowCamera] = useState(false)
  const [sendingPhoto, setSendingPhoto] = useState(false)

  async function sendMessage(e) {
       e.preventDefault()
       if (!msg.trim()) return
       const {uid, photoURL} = auth.currentUser
       const Msg = collection( db, "messages")
       await addDoc( Msg ,{
              text: msg,
              photoURL,
              uid,
              createdAt:  serverTimestamp()
       })
      setMsg('')
  }

  async function sendPhoto(dataUrl) {
    const { uid, photoURL } = auth.currentUser
    setSendingPhoto(true)
    try {
      const imageURL = await uploadChatImage(uid, dataUrl)
      await addDoc(collection(db, "messages"), {
        text: "",
        imageURL,
        photoURL,
        uid,
        createdAt: serverTimestamp()
      })
      setShowCamera(false)
    } catch (err) {
      console.error(err)
      alert("Could not send the photo. Please try again.")
    } finally {
      setSendingPhoto(false)
    }
  }

  return (

    <div className="onMsg">
      {showCamera ? (
        <Camera
          sending={sendingPhoto}
          onCapture={sendPhoto}
          onClose={() => setShowCamera(false)}
        />
      ) : null}
      <form onSubmit={sendMessage}>
      <Input
       style={{ width: '62%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
          type="text"
          value={ msg }
          onChange={ e => setMsg(e.target.value)}
          className="userInput"
          placeholder='Message'
        />
        <IconButton
          type="button"
          className="cameraBtn"
          title="Send a photo"
          aria-label="Open camera"
          onClick={() => setShowCamera(true)}
        >
          <PhotoCameraIcon />
        </IconButton>
        <Button
        style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 2% -13px 2%', maxWidth: '200px'}}
        type="submit"
        className="send">send</Button>
      </form>
    </div>
  )
}

export default Sendmessage
