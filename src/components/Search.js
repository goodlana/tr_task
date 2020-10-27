import React, { useState, useEffect } from 'react'

const Search = ({getData, setParams, params}) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const searchData = () => {
    setParams({...params, search:value})
    getData(params)
  }

  return (
    <>
      <input name="name" value={value} onChange={onChange}/>
      <button onClick={searchData}>찾기</button>
    </>
  )
}

export default Search
