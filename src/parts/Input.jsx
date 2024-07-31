import React, { useState } from 'react'
import Home from '../pages/Home'

function Input() {
    const [sershData, setSearchData] = useState();
  return (
    <>
    <form>
        <input
          type="text"
          value={sershData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Write Username"
        />
        <button type="submit">Search</button>
    </form>
    <Home srdata={sershData}/>
    </>
  )
}

export default Input;
