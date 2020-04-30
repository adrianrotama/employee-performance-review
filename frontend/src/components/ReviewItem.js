import React, { useState } from 'react'
import Rating from './Rating'
import EmployeeName from './EmployeeName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function ReviewItem(props) {
  const {review, type} = props
  const [open, setOpen] = useState(false)

  return (
    <div className='card-item' onClick={()=>setOpen(!open)}>
      <div className='d-flex align-items-center'>
        <div className='flex-grow-1'>
          <div>
            {type=='sent' ? 
              <div>
                <div className='fz-xs color-black-8'>To</div>
                <EmployeeName className='card-content' name={review.employee_to.name}/>
              </div> :
              <div>
                <div className='fz-xs color-black-8'>From</div>
                <EmployeeName className='card-content' name={review.employee_from.name}/>
              </div>
            }
          </div>
        </div>
        <div>
          <div className='fz-lg'>
            <Rating rating={review.rating} size='sm' disabled/>
          </div>
        </div>
        <div>
          <FontAwesomeIcon className='ml-2 color-black-7' icon={open ? faAngleUp : faAngleDown}/>
        </div>
      </div>
      <div className='fz-xs color-black-8 text-right'>{review.finished_at}</div>
      <div className={`mt-2 card-details ${open ? 'open' : ''}`}>
        <div className='fz-xs color-black-8'>Message</div>
        <div className='textarea'>
          {review.reviews}
        </div>
      </div>
    </div>
  );
}