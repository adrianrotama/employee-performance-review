import React, { useState, useEffect } from 'react'
import API from '../../components/API'
import Rating from '../../components/Rating'
import EmployeeName from '../../components/EmployeeName'
import { NavLink } from 'react-router-dom'

export default function ReviewsEdit(props) {
  
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

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem('user_information'))

    API.get(`reviews/${id}`).then(res=>{
      console.log(res)
      const review = res.data

      if(userInformation.role == 'admin' || (userInformation.id == review.employee_from.id)){
        setReview(review)
        setNewValue({
          employee_from_id: review.employee_from.id,
          employee_to_id: review.employee_to.id,
          rating: review.rating,
          reviews: review.reviews,
        })
      }else{
        props.history.push('/')
      }
    })
  },[])

  const handleChangeInput = (e,key) => {
    setNewValue({...newValue, [key]: e.target.value})
  }

  const handleChangeRating = (newRating) => {
    setNewValue({...newValue, 'rating': newRating})
  }

  const handleSubmit = () => {
    API.patch(`reviews/${id}`, {review:newValue}).then(res=>{
      setReview(res.data)
      props.history.push('/')
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
            <div className='fz-xs color-black-6'>From</div>
            <div><EmployeeName name={review.employee_from.name}/></div>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>To</div>
            <div><EmployeeName name={review.employee_to.name}/></div>
          </div>
          <div className='mt-3'>
            <div className='fz-xs color-black-6'>Rating</div>
              <Rating
                rating={newValue.rating}
                handleChangeRating={handleChangeRating}
              />
          </div>
          <div className='mt-4'>
            <div className='fz-xs color-black-6'>Reviews</div>
              <textarea value={newValue.reviews||''} onChange={(e)=>handleChangeInput(e,'reviews')} className='form-control' rows='5'/>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <span className='btn pointer btn-main mr-2' onClick={()=>handleSubmit()}>Save</span>
        <NavLink to='/' exact className='btn btn-outline-secondary'>Back</NavLink>
      </div>
    </div>
  );
}