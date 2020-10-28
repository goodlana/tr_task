import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
    color: #ffffff;
    font-weight: 600;
    height: 35px;
    min-width: 100px;
    margin: 0px;
    cursor: pointer;
    outline: 0;
  }

  input {
    border: 1px solid #dddddd;
    box-sizing: border-box;
    width: 200px;
    height: 35px;
    border-radius: 3px;
    margin-right: 10px;
    padding: 8px;
  }

  .search-toggle-wrapper {
    display: flex;
  }

  .search-toggle {
    margin-right: 10px;
  }

  .pages {
    display:flex;
    justify-content:center;
    align-items: center;
  }

  .page {
    display: block;
    margin: 0px 5px;
    cursor: pointer
  }
`;

const initialParams = {
  search:'',
  ordering: '',
  page_size: 20,
  page: 1
}
const Search = ({ count, setParams, params }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const searchData = () => {
    setParams({ ...params, search: value });
    setValue("");
  };

  const olderData = () => {
    setParams({ ...params, ordering: "id" });
  };

  const newerData = () => {
    setParams({ ...params, ordering: "-id" });
  };

  const pagesize = (num) => {
    setParams({ ...params, page_size: num });
  };

  const pages = () => {
    let result = [1] //default
    let max = Math.ceil(count/params.page_size)
    for(let i=2; i<=max; i++ ) {
      result = result.concat(i)
    }
    return result
  }
  return (
    <SearchStyle>
      <div className="search-wrapper">
        <div className="search-toggle-wrapper">
          <Dropdown className="search-toggle">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              정렬
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={olderData}>오래된순</Dropdown.Item>
              <Dropdown.Item onClick={newerData}>최신순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="search-toggle">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              출력
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => pagesize(20)}>20개</Dropdown.Item>
              <Dropdown.Item onClick={() => pagesize(15)}>15개</Dropdown.Item>
              <Dropdown.Item onClick={() => pagesize(10)}>10개</Dropdown.Item>
              <Dropdown.Item onClick={() => pagesize(5)}>5개</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="pages">
          {pages().map((page,index) => 
            (<p key={index}
                className="page" 
                onClick={()=> setParams({...params, page: page})}
                >
                  {page}
                </p>))}
        </div>
        <div>
          <input name="name" value={value} onChange={onChange} />
          <Button variant="primary" onClick={searchData}>
            찾기
          </Button>
        </div>
      </div>
    </SearchStyle>
  );
};

export default Search;
