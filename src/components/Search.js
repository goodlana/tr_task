import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const SearchStyle = styled.div`
.search-wrapper {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

button {
  border: 1px solid #ffffff;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #7dc9ff;
  color: #ffffff;
  font-weight: 600;
  height: 35px;
  width: 100px;
  margin: 0px;
  cursor: pointer;
  outline: 0;
}

button + button {
  margin-left: 5px;
}
input {
  border: 1px solid #dddddd;
  box-sizing: border-box;
  width: 200px;
  height: 35px;
  border-radius: 3px;
  margin-right: 5px;
  padding: 8px;
}
`

const initialParams = {
  search:'',
  ordering: '',
  page_size: null,
  page: null
}


const Search = ({setParams, params}) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const searchData = () => {
    setParams({...params, search:value})
    setValue('')
  }

  const olderData = () => {
    setParams({initialParams, ordering:'id'})
  }

  const newerData = () => {
    setParams({initialParams, ordering:'-id'})
  }
  return (
    <SearchStyle>
      <div className="search-wrapper">
        <div className="ordering">
        <button onClick={olderData}>오래된순</button>
        <button onClick={newerData}>최근순</button>
      </div>
      <div>
        <input name="name" value={value} onChange={onChange}/>
        <button onClick={searchData}>찾기</button>
      </div>
      </div>
    </SearchStyle>
  )
}

export default Search
