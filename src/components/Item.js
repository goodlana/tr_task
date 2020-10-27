import React from 'react'
import styled from 'styled-components'
import { BsStarFill } from 'react-icons/bs'

const ItemStyle = styled.div`
#title {
  font-size: 16px;
}
#rate {}
`
//가격 고치기
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

//날짜 고치기
const modifyDate = (date) => {
  let year = date.slice(0,4)
  console.log(date)
  let month = date.slice(5,7)
  let day = date.slice(8,10)
  return `${year}년 ${month}월 ${day}일`
}

//

const Item = ({id, title, rate, price, date}) => {
  return (
    <ItemStyle>
      <span id="title">{title}</span>
      <span id="rate"><BsStarFill style={{"fontSize": "14px", "color":"#ffcc00"}} />{rate} </span>
      <span id="price">{modifyPrice(price)}</span>
      <span id="date">{modifyDate(date)}</span>
    </ItemStyle>
  )
}

export default Item
