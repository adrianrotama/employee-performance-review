import React from 'react'

export default function EmployeeName(props) {
  const {name, className} = props
  return (
    <div className={className}>
      {!!name ? <div>{name}</div> : <div className='fz-sm font-italic'>deleted user</div>}
    </div>
  )
}