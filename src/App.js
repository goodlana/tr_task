import axios from 'axios'
import { useState, useEffect } from 'react';
import List from './components/List';
import BasicTable from './components/BasicTable';
import Search from './components/Search';

function App() {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    search:'',
    ordering: '',
    page_size: null,
    page: null
  })
  
  // const getData = () => {
  //   const url = 'http://tourlive-code-test-1586978259.ap-northeast-2.elb.amazonaws.com/v1/tours'
  //   axios.get(url)
  //   .then(json => {setData(json.data.data.results)})
  //   .catch(error => error)
  // }


  const getData = (params) => {
    const url = 'http://tourlive-code-test-1586978259.ap-northeast-2.elb.amazonaws.com/v1/tours'
    axios.get(url, {params: params})
    .then(json => {setData(json.data.data.results)})
    .catch(error => error)
  }

  useEffect(() => {
    getData(params)
  },[data])

  return (
    // <List data={data} />
    <>
      <Search getData={getData} data={data} setParams={setParams} params={params} />
      <BasicTable data={data}/>
    </>
  );
}

export default App;
