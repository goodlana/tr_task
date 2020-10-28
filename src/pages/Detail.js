import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';

const DetailStyle = styled.div`
section {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}

span {
  display: inline-block
}

span + span {
  margin-left: 15px;
}

h2{
  text-align: center;
}

.image-wrapper {
  width: 700px;
  height: 450px;
  object-fit:cover;
  margin: 20px auto;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin-top: 15px;
  align-items: center;
}

.desc-wrapper {
  color: #8a8a8a;
  font-weight: 300;
  width: 100%;
  text-align: right;
  padding-right: 50px
}


`


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
    return(
        <img 
          style={{display:'block', margin: '0 auto', marginTop:'40vh'}}
          src="https://opgg-com-image.akamaized.net/attach/images/20200607053810.969076.gif" 
          alt='로딩이미지'>
        </img>
    )
  }
  
  return (
    <DetailStyle>
    <section>
      <div className="image-wrapper">
        {detail.image ? ( <img className="detail-image" src={detail.image} alt="상세이미지" />) 
        : (<img src="http://www.bsang.co.kr/images/datasheet/MPX11530/1.jpg" />)}
      </div>
      <h2>{detail.title}</h2> 
      <div className="desc-wrapper">      
        <span>{detail.price && modifyPrice(detail.price)}</span>
        <span>⭐{detail.rate}</span>
      </div>
      <hr />
      <div className="content-wrapper">
        <div>{ReactHtmlParser(detail.content)}</div>
      </div>
      </section>
    </DetailStyle>
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
