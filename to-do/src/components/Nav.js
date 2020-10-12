import React from "react"
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    
    <nav>
      <ul>
        <li>
          <NavLink to='/pages/Home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pages/Tasks'>Tasks</NavLink>
        </li>
      </ul>
    </nav>
  );
}