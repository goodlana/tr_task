import { Link } from "react-router-dom"

export const COLUMNS = [
  {
    Header: '번호',
    accessor: 'id'
  },
  {
    Header: '제목',
    accessor: 'title',
    Cell: ({value}) => {
      return <Link to="detail" style={{ textDecoration: 'none', color: '#000000' }}>
      <span>{value}</span>
      </Link>
    }
  },
  {
    Header: '별점',
    accessor:'rate'
  },
  {
    Header: '가격',
    accessor:'price',
    Cell: ({value}) => {return modifyPrice(value)}
  },
  {
    Header:'날짜',
    accessor:'created_at',
    Cell: ({value}) => {return modifyDate(value)}
  }
]



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
  let month = date.slice(5,7)
  let day = date.slice(8,10)
  return `${year}년 ${month}월 ${day}일`
}