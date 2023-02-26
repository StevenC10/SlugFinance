import React from "react";
import './test.css';
import {useState,useEffect} from 'react';

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

const Individual = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setSymbol(stock);
  }
  const [symbol, setSymbol] = useState();
  const [stock, setStock] = useState();
  const [stockData, setStockData] = useState([]);
  const stonks = stockData[0];
  let price = 'a';
  let change = 'a'; 
  let ticker = 'a';
  let dailyChange = 'a';
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
    <div id = "fullpage">
      <nav>
        <div id = "nav-logo-section" class="nav-section">
        <a href = "/">Slug Finance</a>
        </div>
        <div id = "nav-search-section" class="nav-section">
        <form onSubmit = {handleSubmit}>
    <input 
    type = "text" 
    name = "name"
    onChange= {(event) =>
      setStock(event.target.value)}
    />
    <button type = "submit"> Submit</button>
    </form>
        </div>
        <div id = "nav-title-section" class="nav-section">
          <a href = "/individual">myPortfolio</a>
          <a href = "/login">Log In</a>
          <a href = "/signup">Sign Up</a>
        </div>
      </nav>

      <main>
        <article>
          <div class = "article-image-section article-section">
            <h2>{ticker} {price} {change} {dailyChange}</h2>
            <img src="https://i.gyazo.com/95447b3722f580224916474c87eb2363.png" alt="graph" height="500px"></img>
          </div>
          <div class = "article-info-section article-section">
            <h2>Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div class = "article-about-section article-section">
           <h2>About</h2>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </article>
      </main>
    </div>
  );
};
  
export default Individual;
