import axios from 'axios'
import { useState, useEffect } from 'react';
import List from './components/List';

function App() {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    search:'',
    ordering: '',
    page_size: null,
    page: null
  })
  
  const getData = (params) => {
    const url = 'http://tourlive-code-test-1586978259.ap-northeast-2.elb.amazonaws.com/v1/tours'
    axios.get(url, {params: params})
    .then(json => {setData(json.data.data.results)})
    .catch(error => error)
  }

  useEffect(() => {
    getData(params)
  },[])

  return (
    <List data={data} />
  );
}

export default App;
