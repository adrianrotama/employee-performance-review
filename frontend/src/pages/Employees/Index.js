import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function EmployeesIndex() {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    console.log('call API')
    API.get(`employees`).then(res=>{
      setEmployees(res.data)
    })
  },[])

  const handleDelete = (e,id) => {
    e.preventDefault()
    API.delete(`employees/${id}`).then(res=>{
      setEmployees(employees.filter(employee => employee.id !== id));
    })
  }

  return (
    <div className=''>
      <div className='d-flex align-items-center justify-content-between justify-content-md-start'>
        <h4 className='font-weight-bold m-0'>Employees List</h4>
        <div className='ml-0 ml-md-5'>
          <NavLink to='employees/new' exact className='btn btn-main d-none d-md-block'>
            <FontAwesomeIcon icon={faUserPlus} className='mr-2 fz-sm d-none d-md-inline'/>Create New Employee
          </NavLink>
          <NavLink to='employees/new' exact className='btn-mobile d-block d-md-none'>
            <FontAwesomeIcon icon={faPlus} className='fa-2x'/>
          </NavLink>
        </div>
      </div>
      <div className='employee-table mt-4'>
        <div className='d-none d-md-flex table-row table-header'>
          <div className='name-width'>Employee Name</div>
          <div className='email-width'>Email</div>
          <div className='role-width'>Role</div>
          <div className='action-width'>Action</div>
        </div>
        {
          employees.map((employee,index)=>{
            return(
              <div key={index}>
                <NavLink to={`/employees/${employee.id}`} exact className='d-none d-md-flex table-row align-items-center'>
                  <div className='name-width'>{employee.name}</div>
                  <div className='email-width'>{employee.email}</div>
                  <div className='role-width'>
                    <div className={`role ${employee.role=='admin' ? 'admin' : 'normal'}`}>{employee.role}</div>
                  </div>
                  <div className='action-width'>
                    <span className='btn btn-outline-danger' onClick={(e)=>handleDelete(e, employee.id)}>DELETE</span>
                  </div>
                </NavLink>
                <NavLink to={`/employees/${employee.id}`} exact className='d-block d-md-none table-row'>
                  <div className='d-flex'>
                    <div className='flex-grow-1'>
                      <div className='d-flex align-items-center'>
                        <div className='font-weight-bold'>{employee.name}</div>
                        <div className='ml-3'>
                          <div className={`role ${employee.role=='admin' ? 'admin' : 'normal'}`}>{employee.role}</div>
                        </div>
                      </div>
                      <div className='mt-1 color-black-7 fz-sm'>{employee.email}</div>
                    </div>
                    <div className='align-self-center btn btn-outline-danger' onClick={(e)=>handleDelete(e, employee.id)}>DELETE</div>
                  </div>
                  
                </NavLink>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}