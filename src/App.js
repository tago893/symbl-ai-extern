import React from 'react';
import './App.css';

function GetSortOrder(prop){
  return function(a,b){
    if( a[prop] > b[prop]){
      return 1;
    }else if( a[prop] < b[prop] ){
      return -1;
    }
    return 0;
  }
}
function getRequest(data) {
  try {
    data.sort(GetSortOrder("id"));
    for (var obj in data) {
      console.log(data[obj]['id'] + " " +data[obj]['name']);
    }
    return data;
  } catch (e) {
    if (Number(e.status) === 404) {
      return [];
    }
    console.error("error in getRequest", JSON.stringify(e.errors));
    throw e;
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  componentDidMount() {
    const apiUrl = 'https://www.example.com/get-data'; 
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ data: getRequest(data)});
        });
  }
  render() {
    const { data } = this.state;
    return (
        
        <div>

        <h1> React app to fetch and show sorted data </h1>
          {
            data.map((item) => (
              <ol key={ item.id }>
                { item.id } : { item.name }
              </ol>
          ))
        }
        </div>
    )}
}

export default App;
