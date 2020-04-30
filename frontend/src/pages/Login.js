import React, { useState } from 'react'
import API from '../components/API'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    API.post(`login`,{
      email: email,
      password: password
    }).then(res=>{
      if(!res.data.errors){
        localStorage.setItem('token', res.data.jwt)
        localStorage.setItem('user_information', JSON.stringify(res.data.employee))
        props.history.push('/')
      }
    })
  }

  return (
    <div className='bg-light'>
      <div className='container login-container'>
        <div className='login-box'>
          <div className='login-title'>Log In To Employee Performance Report</div>
          <div className='mt-4'>
            <div>
              <div className='fz-sm color-black-8 font-weight-bold mb-1'>Email Address</div>
              <input className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='mt-3'>
              <div className='fz-sm color-black-8 font-weight-bold mb-1'>Password</div>
              <input type='password' className='form-control' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='mt-4'>
              <div className='btn btn-block btn-main' onClick={()=>{handleLogin()}}>LOG IN</div>
            </div>
            <div className='mt-4 color-black-6 fz-xs'>
              hint:<br/>
              admin@example.com / admin<br/>
              userA@example.com / a<br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}