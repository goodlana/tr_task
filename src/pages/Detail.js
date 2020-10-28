import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';


const Detail = ({id}) => {
  const [detail, setDetail] = useState({
    title:null,
    image:null,
    price:null,
    rate:null,
    content:null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})


  useEffect(() => {
    let ignore = false;
    const url = 'http://tourlive-code-test-1586978259.ap-northeast-2.elb.amazonaws.com/v1/tours'
    
    const axiosDetail = async () => {
      try {
        setLoading(true);
        setError({});
        const response = await axios.get(url + `/${id}`)
        if(!ignore) setDetail(response.data.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false);
    }
    axiosDetail();
    return (() => {ignore = true});
  },[])

  if(loading) {
    return<div>로딩중..</div>
  }
  
  return (
    
    <div>
      <h2>{detail.title}</h2>
      <img src={detail.image} alt="상세이미지" />
      <div>{detail.price && modifyPrice(detail.price)}</div>
      <div>{detail.rate}</div>
      {ReactHtmlParser(detail.content)} 
    </div>
  )
}

export default Detail


const modifyPrice = price => {
  if(price.indexOf('.') !== -1) {
    price = price.slice(0, price.indexOf('.')) 
  }
  
  //1000의 자리 콤마
  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return numberWithCommas(price) + '원 '
}
