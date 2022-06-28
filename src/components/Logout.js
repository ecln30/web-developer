import React from 'react'
import { logout } from "../firebase.js"
import { Button } from '@mui/material'


function Logout({}) {
  return (
     <div>
        <Button
         className="signout"
         onClick={ logout }
        >Logout</Button>
     </div>
  )
}

export default Logout