
import './App.css';
import React, {useState,useEffect } from 'react';
const getStock = (symbol, setStockData) => {
  //how to stop firing on intial render 
  //https://stackoverflow.com/questions/72146986/useeffect-firing-on-initial-render
  symbol && fetch(`http://127.0.0.1:5000/v0/ticker?id=` + symbol, {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
})
  .then((response) => {
    if(!response.ok) {
      throw response;
    }
    return response.json();
  })
  .then((json) => {
    setStockData(json)
  })
}
function App() {
  // const [stock, setStock] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSymbol(stock);
  }
  const [symbol, setSymbol] = useState();
  const [stock, setStock] = useState();
  const [stockData, setStockData] = useState([]);
  const stonks = stockData[0];
  let price = undefined;
  let change = undefined; 
  let ticker = undefined;
  let dailyChange = undefined;
  useEffect(() => {
    getStock(symbol, setStockData);
  }, [symbol]);
  if(stonks !== undefined) {
    price = stonks.price;
    change = stonks.change;
    ticker = stonks.symbol;
    dailyChange = stonks.dailyChange;
  }
  return (
    <div>
    <form onSubmit = {handleSubmit}>
    <input 
    type = "text" 
    name = "name"
    onChange= {(event) =>
      setStock(event.target.value)}
    />
    <button type = "submit"> Submit</button>
    </form>

    <table>
      <tr>
        <th>Ticker Name</th>
        <th>Change</th>
        <th>Daily Change</th>
        <th>Current Price</th>
      </tr>
      <tr>
        <td>{ticker}</td>
        <td>{change}</td>
        <td>{dailyChange}</td>
        <td>{price}</td>
      </tr>
    </table>
    <ol type = "1">
      
    </ol>
    </div>
  );
}

export default App;