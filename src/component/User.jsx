import React from 'react'

const User = (props) => {
  return (
    <div className='font-bold text-white'>{props.elem.fullName}</div>
  )
}

export default User