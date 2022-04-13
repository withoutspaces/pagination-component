import React from 'react'

const Item = (Props) => {
  return (
    <div className="item">
      <h4>{Props.name}</h4>
      <p>{Props.email}</p>
    </div>
  )
}

export default Item
