import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Rating(props) {
  const {rating, handleChangeRating, size, disabled} = props
  const [tempRating,setTempRating] = useState(0)

  const handleOnMouseOver = (i) => {
    if(!disabled){
      setTempRating(i)
    }
  }
  
  const handleOnMouseOut = () => {
    if(!disabled){
      setTempRating(0)
    }
  }

  let stars = []
  for(let i=1;i<=5;i++){
    disabled ? 
      stars.push(<FontAwesomeIcon key={i} color={rating>=i ? '#ff9901' : '#777'} icon={faStar} className={`mr-1 ${size=='sm' ? 'fa-1x' : 'fa-2x'}`}/>) :
      stars.push(<FontAwesomeIcon key={i} color={rating>=i ? '#ff9901' : tempRating>=i ? '#febc5a' : '#777'} icon={faStar} className='mr-1 fa-2x pointer' onMouseOver={()=>handleOnMouseOver(i)} onMouseOut={()=>handleOnMouseOut()} onClick={()=>handleChangeRating(i)}/>)
  }

  return (
    <div>{stars}</div>
  );
}