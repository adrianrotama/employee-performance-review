import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <div className='header-container'>
        <NavLink to="/" exact>EMPLOYEES PERFORMANCE REVIEW</NavLink>
      </div>
    </div>
  );
}