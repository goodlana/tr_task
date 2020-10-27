import React from 'react'
import Item from './Item'

const List = ( {data} ) => {
  return (
    <div>
      {data.map(result => (
        <Item key={result.id}
              id={result.id}
              title={result.title}
              rate={result.rate}
              price={result.price}
              date={result.created_at}
              /> 
      ))}
    </div>
  )
}

export default List
