import React, {useMemo} from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import Detail from '../pages/Detail'
import './BasicTable.css'
import { Link } from 'react-router-dom'

const BasicTable = ({data, setId}) => {

  const columns = useMemo(() => COLUMNS, [])
  // const newdata = useMemo(() => data, [])
  
  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,} = tableInstance

  return (
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
  )
}

export default BasicTable


//<Link to={`${row.original.id}`} component={Detail}/>