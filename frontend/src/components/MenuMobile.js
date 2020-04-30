import React, { useEffect, useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faComment, faUserFriends, faPowerOff } from '@fortawesome/free-solid-svg-icons'

function MenuMobile(props){
  const [role,setRole] = useState('')
  useEffect(()=>{
    const userInformation = JSON.parse(localStorage.getItem('user_information'))
    if(!!userInformation){
      setRole(userInformation.role)
    }
  },[])
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_information')
    props.history.push('/login')
  }

  return(
    <div className='menu-mobile'>
      <div className='m-container'>
        <NavLink to='/' exact className='menu' activeClassName='active'>
          <div className='icon'><FontAwesomeIcon icon={faHome}/></div>
          <div className='text'>Dashboard</div>
        </NavLink>
        {
          role == 'admin' &&
          <>
          <NavLink to='/employees' exact className='menu' activeClassName='active'>
            <div className='icon'><FontAwesomeIcon icon={faUserFriends}/></div>
            <div className='text'>Employees</div>
          </NavLink>
          <NavLink to='/reviews' exact className='menu' activeClassName='active'>
            <div className='icon'><FontAwesomeIcon icon={faComment}/></div>
            <div className='text'>Reviews</div>
          </NavLink>
          </>
        }
        <a className='menu' onClick={()=>{handleLogout()}}>
          <div className='icon'><FontAwesomeIcon icon={faPowerOff}/></div>
          <div className='text'>Logout</div>
        </a>
      </div>
    </div>
  )
}
export default withRouter(MenuMobile)