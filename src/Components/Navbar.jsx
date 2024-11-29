import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
     <div className=' mb-4 mt-0  text-black flex flex-row gap-5 place-content-evenly border-2 border-gray-400  p-4 '>
    <NavLink   to='/'>
      Home
    </NavLink> 
      
      <NavLink to="/pastes">
         Pastes
      </NavLink>
      </div>
  )
}

export default Navbar