import React from 'react'
import { logout } from "../firebase.js"

function Logout() {

  return (
     <div>
        <button
         className="signout"
         onClick={ logout }
        >Logout</button>
     </div>
  )
}

export default Logout