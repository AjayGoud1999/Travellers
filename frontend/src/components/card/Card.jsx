import React from 'react';
import "./Card.css"

const Card = ({text}) => {
  return (
    <div className='card-container'>{text}</div>
  )
}

export default Card