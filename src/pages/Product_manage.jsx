import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Product_manage() {
  return (
    <div className="admin-links">
        <h3>Manage your products here:</h3>
        <NavLink to = "/addProd" className="admin-card">Add new product</NavLink>
        <NavLink to = "/updateProd" className="admin-card">Update existing product</NavLink>
        <NavLink to = "/deleteProd" className="admin-card">Delete product</NavLink>
        <NavLink to = "/searchProd" className="admin-card">Search product</NavLink>
    </div>
  )
}
