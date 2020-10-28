import axios from 'axios'
import { useState, useEffect } from 'react';
import BasicTable from './components/BasicTable';
import Search from './components/Search';
import {Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from './pages/Detail';

function App() {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [id, setId] = useState('')
  const [params, setParams] = useState({
    search:'',
    ordering: '',
    page_size: 20,
    page: 1
  })

  const getData = (params) => {
    const url = 'http://tourlive-code-test-1586978259.ap-northeast-2.elb.amazonaws.com/v1/tours'
    axios.get(url, {params: params})
    .then(json => {
      setData(json.data.data.results)
      setCount(json.data.data.count)
    })
    .catch(error => error)
  }

  useEffect(() => {
    getData(params)
  },[data])

  return (
    <>
    <Route exact path="/">
      <BasicTable data={data} setId={setId}/>
      <Search setCount={setCount} count={count} setParams={setParams} params={params} />
    </Route>
    <Route path="/detail">
      <Detail id={id}/>
    </Route>
    </>
  );
}

export default App;
