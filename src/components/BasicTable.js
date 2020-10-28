import React, {useMemo} from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import styled from 'styled-components'

const TableStyle = styled.div`
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 5px auto;
}

thead {
  background-color: #297bff;
  color: #ffffff;
  text-align: center;
}

td, th {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}


tbody tr:hover {
  background-color: #d4e5ff;
  font-weight: 600;
  cursor: pointer;
}

span {
  display: block;
  text-align: left;
}`

const BasicTable = ({data, setId}) => {

  const columns = useMemo(() => COLUMNS, [])
  // const newdata = useMemo(() => data, [])
  
  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,} = tableInstance

  return (
    <TableStyle>
          <div className="table-wrapper">
          <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => {setId(row.original.id)}}>
                {
                  row.cells.map((cell) => {
                    return  <td {...cell.getCellProps()} >
                    {cell.render('Cell')}
                    </td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>
    </TableStyle>
  )
}

export default BasicTable


//<Link to={`${row.original.id}`} component={Detail}/>