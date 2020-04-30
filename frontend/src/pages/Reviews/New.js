import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import { NavLink } from 'react-router-dom'

export default function EmployeesNew(props) {
  
  const [employees, setEmployees] = useState([])
  const [newValue, setNewValue] = useState({
    employee_to_id: '',
    employee_from_id: '',
    rating: 0,
    reviews: '',
  })
  
  useEffect(() => {
    API.get(`employees`).then(res=>{
      setEmployees(res.data)
      if(res.data.length > 0){
        const default_id = res.data[0].id;
        setNewValue({...newValue, employee_to_id: default_id, employee_from_id: default_id})
      }
    })
  },[])

  const handleChangeInput = (e,key) => {
    setNewValue({...newValue, [key]: e.target.value})
  }

  const handleSubmit = () => {
    API.post(`/reviews`, {review:newValue}).then(res=>{
      props.history.push('/reviews')
    })
  }

  return (
    <div className=''>
      <div className=' d-flex justify-content-between'>
        <h4 className='font-weight-bold'>Create New Review</h4>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className=''>
            <div>
              <div className='fz-xs color-black-6'>From</div>
              <select className='form-control' defaultValue={newValue.employee_from_id} onChange={(e)=>handleChangeInput(e,'employee_from_id')}>
                {employees.map((employee,index)=>{
                  return(
                    <option key={index} value={employee.id}>{employee.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='mt-3'>
            <div>
              <div className='fz-xs color-black-6'>To</div>
              <select className='form-control' defaultValue={newValue.employee_to_id} onChange={(e)=>handleChangeInput(e,'employee_to_id')}>
                {employees.map((employee,index)=>{
                  return(
                    <option key={index} value={employee.id}>{employee.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <span className='btn pointer btn-main mr-2' onClick={()=>handleSubmit()}>Save</span>
        <NavLink to='/reviews' exact className='btn btn-outline-secondary'>Back</NavLink>
      </div>
    </div>
  );
}