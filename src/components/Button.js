import React from 'react'

const Button = ({data, click}) => {

  return (
    <div className='btn' id={data.id} style={{order: data.order}} onClick={event => click(event.target, data)} >{data.sign}</div>
  )
}

export default Button