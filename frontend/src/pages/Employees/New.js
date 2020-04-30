import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import { NavLink } from 'react-router-dom'

export default function EmployeesNew(props) {
  
  const id = props.match.params.id
  const [employee, setEmployee] = useState({})
  const [newValue, setNewValue] = useState({
    name: '',
    email: '',
    password: '',
    role: 0,
  })

  const handleChangeInput = (e,key) => {
    setNewValue({...newValue, [key]: e.target.value})
  }

  const handleSubmit = () => {
    API.post(`employees`, {employee:newValue}).then(res=>{
      props.history.push('/employees')
    })
  }

  return (
    <div className=''>
      <div className=' d-flex justify-content-between'>
        <h4 className='font-weight-bold'>Create New Employee</h4>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className=''>
            <div>
              <div className='fz-xs color-black-6'>Name</div>
              <input className='form-control' value={newValue.name} onChange={(e)=>handleChangeInput(e,'name')}/>
            </div>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Email</div>
            <input className='form-control' value={newValue.email} onChange={(e)=>handleChangeInput(e,'email')}/>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Password</div>
            <input type='password' className='form-control' value={newValue.password} onChange={(e)=>handleChangeInput(e,'password')}/>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Role</div>
            <select className='form-control' defaultValue={newValue.role} onChange={(e)=>handleChangeInput(e,'role')}>
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <span className='btn pointer btn-main mr-2' onClick={()=>handleSubmit()}>Save</span>
        <NavLink to='/employees' exact className='btn btn-outline-secondary'>Back</NavLink>
      </div>
    </div>
  );
}