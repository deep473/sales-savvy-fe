import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Admin_home() {
  return (
    <div className="admin-links">
      <h3>Welcome to Admin Home</h3>

      <NavLink to = "/pm" className="admin-card">Product management</NavLink>
      <NavLink to = "/um" className="admin-card">User management</NavLink>
    </div>
  )
}
