import React from 'react'

function Logout() {
    localStorage.clear();
    window.location.assign('/')
  return (
    <div>
      
    </div>
  )
}

export default Logout
