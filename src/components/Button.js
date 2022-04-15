import React from 'react'

const Button = ({data}) => {

  return (
    <div className='btn' id={data.id} style={{order: data.order}} >{data.sign}</div>
  )
}

export default Button