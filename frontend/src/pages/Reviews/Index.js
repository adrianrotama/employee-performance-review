import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import Rating from '../../components/Rating'
import EmployeeName from '../../components/EmployeeName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentMedical, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function ReviewsIndex() {

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    API.get(`reviews`).then(res=>{
      console.log(res.data)
      setReviews(res.data)
    })
  },[])

  const handleDelete = (e,id) => {
    e.preventDefault()
    API.delete(`reviews/${id}`).then(res=>{
      setReviews(reviews.filter(review => review.id !== id));
    })
  }

  return (
    <div className=''>
      <div className='d-flex align-items-center justify-content-between justify-content-md-start'>
        <h4 className='font-weight-bold m-0'>Performance Reviews List</h4>
        <div className='ml-0 ml-md-5'>
          <NavLink to='reviews/new' exact className='btn btn-main d-none d-md-block'>
            <FontAwesomeIcon icon={faCommentMedical} className='fz-sm mr-2'/>Create New Performance Review
          </NavLink>
          <NavLink to='reviews/new' exact className='btn-mobile d-block d-md-none'>
            <FontAwesomeIcon icon={faPlus} className='fa-2x'/>
          </NavLink>
        </div>
      </div>
      <div className='employee-table mt-4'>
        <div className='d-none d-md-flex table-row table-header'>
          <div className='date-width'>Date</div>
          <div className='from-width'>From</div>
          <div className='to-width'>To</div>
          <div className='rating-width'>Rating</div>
          <div className='review-width'>Review</div>
          <div className='action-width'>Action</div>
        </div>
        {
          reviews.map((review,index)=>{
            return(
              <div key={index}>
                <NavLink to={`/reviews/${review.id}`} exact className='d-none d-md-flex table-row align-items-center'>
                  <div className='date-width'>{review.created_at}</div>
                  <div className='from-width'><EmployeeName name={review.employee_from.name}/></div>
                  <div className='to-width'><EmployeeName name={review.employee_to.name}/></div>
                  <div className='rating-width'><Rating rating={review.rating} size='sm' disabled/></div>
                  <div className='review-width textarea overflow-ellipsis'>{review.reviews}</div>
                  <div className='action-width'>
                    <span className='btn btn-outline-danger' onClick={(e)=>handleDelete(e, review.id)}>DELETE</span>
                  </div>
                </NavLink>
                <NavLink to={`/reviews/${review.id}`} exact className='d-block d-md-none table-row'>
                  <div className='row'>
                    <div className='col-4'>
                      <div className='fz-xs color-black-8'>From</div>
                      <div><EmployeeName name={review.employee_from.name}/></div>
                    </div>
                    <div className='col-4'>
                      <div className='fz-xs color-black-8'>To</div>
                      <div><EmployeeName name={review.employee_to.name}/></div>
                    </div>
                    <div className='col-4 text-right fz-sm d-flex flex-column justify-content-around'>
                      <div className='fz-xs'><Rating rating={review.rating} size='sm' disabled/></div>
                      <div className='fz-xs color-black-8'>{review.created_at}</div>
                    </div>
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