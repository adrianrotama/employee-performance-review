import React, { useState, useEffect } from 'react'
import API from '../components/API'
import Rating from '../components/Rating'
import ReviewItem from '../components/ReviewItem'
import EmployeeName from '../components/EmployeeName'
import { NavLink } from 'react-router-dom'

export default function Home(props){
  const [user,setUser] = useState({name:''})
  useEffect(() => {
    if(!!localStorage.getItem('user_information')){
      setUser(JSON.parse(localStorage.getItem('user_information')))
    }
  },[])

  const [receivedReviews,setReceivedReviews] = useState([])
  useEffect(() => {
    API.get(`get_received_reviews`).then(res=>{
      setReceivedReviews(res.data)
    })
  },[])

  const [pendingReviews,setPendingReviews] = useState([])
  useEffect(() => {
    API.get(`get_pending_reviews`).then(res=>{
      setPendingReviews(res.data)
    })
  },[])

  const [sentReviews,setSentReviews] = useState([])
  useEffect(() => {
    API.get(`get_sent_reviews`).then(res=>{
      setSentReviews(res.data)
    })
  },[])

  const avgRating = () => {
    if(receivedReviews.length > 0){
      let sum = receivedReviews.reduce((total, review)=>{
        return total + review.rating;
      }, 0);
      return parseFloat(sum/receivedReviews.length).toPrecision(2)
    }
    return 0
  }

  const avgRatingPercentage = () => {
    return receivedReviews.length > 0 ? avgRating()/5*100+"%" : 0
  }

  return (
    <div className=''>
      <div className='row d-flex justify-content-between'>
        <h4 className='col-12 font-weight bold'>{`Welcome back, ${user.name}!`}</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-12 col-lg-4'>
          <div className='card mb-5'>
            <div className='card-header text-right'>
              <div className='card-decor red'></div>
              <div className='flex-grow-1 ml-4'>
                <div className='color-black-7'>Average Ratings</div>
                <div className='fz-xl font-weight-bold'>{avgRating()}</div>
                <div className='rating-bar-container mt-2'>
                  <div className='rating-bar' style={{width: avgRatingPercentage()}}/>
                </div>
              </div>
            </div>
          </div>
          <div className='card mb-5'>
            <div className='card-header text-right'>
              <div className='card-decor blue'></div>
              <div className='flex-grow-1'>
                <div className='color-black-7'>Pending Reviews</div>
                <div className='fz-xl font-weight-bold'>{pendingReviews.length}</div>
              </div>
            </div>
            <div className='card-body'>
              {
                pendingReviews.length > 0 ?
                pendingReviews.map((pendingReview,index)=>{
                  return(
                    <NavLink to={`/reviews/${pendingReview.id}/edit`} className='card-item' key={index}>
                      <div className='d-flex'>
                        <div className='flex-grow-1'>
                          <div className='fz-xs color-black-8'>To</div>
                          <div className='card-content'><EmployeeName name={pendingReview.employee_to.name}/></div>
                        </div>
                        <div className='fz-lg'>
                          <Rating rating={0} size='sm' disabled/>
                        </div>
                      </div>
                      <div className='fz-xs color-black-8 text-right'>{pendingReview.created_at}</div>
                    </NavLink>
                  )
                }) : 
                <div className='card-item blank'>No Pending Request.</div>
              } 
            </div>
          </div>
        </div>

        <div className='col-12 col-lg-4'>
          <div className='card mb-5'>
            <div className='card-header text-right'>
              <div className='card-decor orange'></div>
              <div className='flex-grow-1'>
                <div className='color-black-7'>Received Reviews</div>
                <div className='fz-xl font-weight-bold'>{receivedReviews.length}</div>
              </div>
            </div>
            <div className='card-body'>
              {
                receivedReviews.length > 0 ? 
                receivedReviews.map((receivedReview,index)=>{
                  return(
                    <ReviewItem type='received' review={receivedReview} key={index}/>
                  )
                }) :
                <div className='card-item blank'>You haven't received any reviews yet.</div>
              }
            </div>
          </div>
        </div>

        <div className='col-12 col-lg-4'>
          <div className='card mb-5'>
            <div className='card-header text-right'>
              <div className='card-decor green'></div>
              <div className='flex-grow-1'>
                <div className='color-black-7'>Sent Reviews</div>
                <div className='fz-xl font-weight-bold'>{sentReviews.length}</div>
              </div>
            </div>
            <div className='card-body'>
              {
                sentReviews.length > 0 ?
                sentReviews.map((sentReview,index)=>{
                  return(
                    <ReviewItem type='sent' review={sentReview} key={index}/>
                  )
                }) :
                <div className='card-item blank'>You haven't sent any reviews yet.</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}