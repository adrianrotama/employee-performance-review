import React, { useEffect, useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHome, faUserFriends, faPowerOff } from '@fortawesome/free-solid-svg-icons'

function MenuBar(props) {
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

  return (
    <div className='menubar'>
      <NavLink className='list' to="/" exact>
        <FontAwesomeIcon icon={faHome} className='mr-2'/>Dashboard
      </NavLink>
      {
        role == 'admin' &&
        <>
        <NavLink className='list' to="/employees" exact>
          <FontAwesomeIcon icon={faUserFriends} className='mr-2'/>Employees
        </NavLink>
        <NavLink className='list' to="/reviews" exact>
          <FontAwesomeIcon icon={faComment} className='mr-2'/>Reviews
        </NavLink>
        </>
      }
      
      <div className='divider my-3'/>
      <a className='list' onClick={()=>{handleLogout()}}>
        <FontAwesomeIcon icon={faPowerOff} className='mr-2'/>Logout
      </a>
    </div>
  );
}
export default withRouter(MenuBar)