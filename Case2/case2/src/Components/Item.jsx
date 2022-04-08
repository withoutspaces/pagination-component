import React from 'react'

const Item = (Props) => {
  return (
    <div className="item">
      <p>{Props.name}</p>
      <p>{Props.email}</p>
    </div>
  )
}

export default Item
