import React from 'react'
import { useState } from 'react'

const Card = ({ count, setCount }) => {
  return (
    <div>
         <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default Card