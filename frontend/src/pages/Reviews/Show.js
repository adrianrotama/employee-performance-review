import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import Rating from '../../components/Rating'
import EmployeeName from '../../components/EmployeeName'
import { NavLink } from 'react-router-dom'

export default function ReviewsShow(props) {
  
  const id = props.match.params.id
  const defaultReviewState = {
    created_at: '',
    employee_from: {id: '', name: ''},
    employee_to: {id: '', name: ''},
    rating: 0,
    reviews: '',
  }
  const [review, setReview] = useState(defaultReviewState)
  const [newValue, setNewValue] = useState({
    employee_from_id: '',
    employee_to_id: '',
    rating: 0,
    reviews: '',
  })
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    API.get(`employees`).then(res=>{
      setEmployees(res.data)
    })
  },[])

  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    API.get(`reviews/${id}`).then(res=>{
      const review = res.data
      setReview(review)
      setNewValue({
        employee_from_id: review.employee_from.id,
        employee_to_id: review.employee_to.id,
        rating: review.rating,
        reviews: review.reviews,
      })
    })
  },[])

  const handleChangeInput = (e,key) => {
    console.log(e.target)
    setNewValue({...newValue, [key]: e.target.value})
  }

  const handleChangeRating = (newRating) => {
    setNewValue({...newValue, 'rating': newRating})
  }

  const handleSubmit = () => {
    API.patch(`reviews/${id}`, {review:newValue}).then(res=>{
      setReview(res.data)
      setIsEdit(false)
    })
  }

  return (
    <div className=''>
      <div className=' d-flex justify-content-between'>
        <h4 className='font-weight-bold'>Review Details</h4>
      </div>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className=''>
            <div>
              <div className='fz-xs color-black-6'>Created At</div>
                <div>{review.created_at}</div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>From</div>
            {
              isEdit ? 
              <select className='form-control' defaultValue={newValue.employee_from_id} onChange={(e)=>handleChangeInput(e,'employee_from_id')}>
                {employees.map((employee,index)=>{
                  return(
                    <option key={index} value={employee.id}>{employee.name}</option>
                  )
                })}
              </select> :
              <div><EmployeeName name={review.employee_from.name}/></div>
            }
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>To</div>
            {
              isEdit ? 
              <select className='form-control' defaultValue={newValue.employee_to_id} onChange={(e)=>handleChangeInput(e,'employee_to_id')}>
                {employees.map((employee,index)=>{
                  return(
                    <option key={index} value={employee.id}>{employee.name}</option>
                  )
                })}
              </select> :
              <div><EmployeeName name={review.employee_to.name}/></div>
            }
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Rating</div>
            {
              isEdit ? 
              <Rating
                rating={newValue.rating}
                handleChangeRating={handleChangeRating}
              /> :
              <Rating rating={review.rating} disabled/>
            }
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Reviews</div>
            {
              isEdit ? 
              <textarea value={newValue.reviews} onChange={(e)=>handleChangeInput(e,'reviews')} className='form-control' rows='5'/> :
              <div className='textarea'>{review.reviews}</div>
            }
          </div>
        </div>
      </div>
      <div className='mt-4'>
        {
          isEdit ?
          <span>
            <span className='btn pointer btn-main mr-2' onClick={()=>handleSubmit()}>Save</span>
            <span className='btn pointer btn-outline-secondary mr-2' onClick={()=>{setIsEdit(false)}}>Cancel</span>
          </span> :
          <span>
            <span className='btn btn-main mr-2' onClick={()=>{setIsEdit(true)}}>Edit</span>
            <NavLink to='/reviews' exact className='btn btn-outline-secondary'>Back</NavLink>
          </span>
        }
      </div>
    </div>
  );
}