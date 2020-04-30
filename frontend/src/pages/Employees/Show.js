import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'

export default function EmployeesShow(props) {
  
  const id = props.match.params.id
  const [employee, setEmployee] = useState({})
  const [newValue, setNewValue] = useState({
    name: '',
    email: '',
    role: 0,
  })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    API.get(`employees/${id}`).then(res=>{
      setEmployee(res.data)
      setNewValue(res.data)
    })
  },[])

  const handleChangeInput = (e,key) => {
    setNewValue({...newValue, [key]: e.target.value})
  }

  const handleSubmit = () => {
    API.patch(`employees/${id}`, {employee:newValue}).then(res=>{
      setEmployee(newValue)
      setIsEdit(false)
    })
  }

  return (
    <div className=''>
      <div className=' d-flex justify-content-between'>
        <h4 className='font-weight-bold'>Employee Details</h4>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className=''>
            <div>
              <div className='fz-xs color-black-6'>Name</div>
              {
                isEdit ? 
                <input className='form-control' value={newValue.name} onChange={(e)=>handleChangeInput(e,'name')}/> :
                <div>{employee.name}</div>
              }
            </div>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Email</div>
            {
              isEdit ? 
              <input className='form-control' value={newValue.email} onChange={(e)=>handleChangeInput(e,'email')}/> :
              <div>{employee.email}</div>
            }
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Role</div>
            {
              isEdit ? 
              <select className='form-control' defaultValue={newValue.role} onChange={(e)=>handleChangeInput(e,'role')}>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select> :
              <div>{employee.role}</div>
            }
          </div>
        </div>
      </div>
      <div className='mt-4'>
        {
          isEdit ?
          <span>
            <span className='btn pointer btn-main mr-2' onClick={()=>handleSubmit()}>Save</span>
            <span className='btn pointer btn-outline-secondary' onClick={()=>{setIsEdit(false)}}>Cancel</span>
          </span> :
          <span>
            <span className='btn btn-main mr-2' onClick={()=>{setIsEdit(true)}}>Edit</span>
            <NavLink to='/employees' exact className='btn btn-outline-secondary'>Back</NavLink>
          </span>
        }
      </div>
    </div>
  );
}