import React from 'react'

const Button = ({ btnFun, btnStyle, title }) => {
  return (
    <button onClick={btnFun} className={btnStyle}>
      {title}
    </button>
  )
}

export default Button
