import axios from 'axios'
import { useState, useEffect } from 'react';
import BasicTable from './components/BasicTable';
import Search from './components/Search';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
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
      <BasicTable data={data}/>
      <Search setCount={setCount} count={count} setParams={setParams} params={params} />
    </>
  );
}

export default App;
