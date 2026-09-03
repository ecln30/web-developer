import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@mui/material'

const CONSTRAINTS = (facingMode) => ({
  video: { facingMode, width: { ideal: 640 }, height: { ideal: 480 } },
  audio: false,
})

function readableError(err) {
  switch (err && err.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Camera access was blocked. Allow the camera in your browser settings and try again.'
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'No camera was found on this device.'
    case 'NotReadableError':
      return 'The camera is already in use by another app.'
    default:
      return 'Could not connect to the camera. Please try again.'
  }
}

function Camera({ onCapture, onClose, sending }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [facingMode, setFacingMode] = useState('user')
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const [connecting, setConnecting] = useState(true)

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const startStream = useCallback(async (mode) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('This browser does not support camera access.')
      setConnecting(false)
      return null
    }
    setConnecting(true)
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS(mode))
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
      setConnecting(false)
      return stream
    } catch (err) {
      console.error(err)
      setError(readableError(err))
      setConnecting(false)
      return null
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    startStream(facingMode).then(stream => {
      // the effect was cleaned up while getUserMedia was still pending
      if (cancelled && stream) {
        stream.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
    })
    return () => {
      cancelled = true
      stopStream()
    }
  }, [facingMode, startStream])

  function takePhoto() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !video.videoWidth) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    // the front-camera preview is mirrored for natural framing, but the frame is
    // saved unmirrored so text in the photo stays the right way round
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    setPhoto(canvas.toDataURL('image/jpeg', 0.8))
  }

  function retake() {
    setPhoto(null)
  }

  function flipCamera() {
    setPhoto(null)
    stopStream()
    setFacingMode(mode => (mode === 'user' ? 'environment' : 'user'))
  }

  function close() {
    stopStream()
    onClose()
  }

  return (
    <div className="camera">
      <div className="cameraHead">
        <span className="cameraTitle">Camera</span>
        <button className="cameraClose" onClick={close} type="button"> X </button>
      </div>

      <div className="cameraStage">
        {error ? <p className="cameraError">{error}</p> : null}
        {!error && connecting ? <p className="cameraStatus">Connecting to camera…</p> : null}

        <video
          ref={videoRef}
          className={`cameraVideo ${photo || error ? 'hide' : ''} ${facingMode === 'user' ? 'mirrored' : ''}`}
          playsInline
          muted
          autoPlay
        />
        {photo ? <img className="cameraShot" src={photo} alt="Captured" /> : null}
        <canvas ref={canvasRef} className="hide" />
      </div>

      <div className="cameraControls">
        {error ? (
          <Button type="button" onClick={() => startStream(facingMode)}>Retry</Button>
        ) : photo ? (
          <>
            <Button type="button" onClick={retake} disabled={sending}>Retake</Button>
            <Button type="button" onClick={() => onCapture(photo)} disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={flipCamera} disabled={connecting}>Flip</Button>
            <Button type="button" onClick={takePhoto} disabled={connecting}>Capture</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Camera
