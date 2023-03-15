import React from "react";
import ReactApexChart from "react-apexcharts";
import {useNavigate} from 'react-router-dom';
import Logo from "../images/test2.png"
// from mamba ui

/**
 * Redirects to login page
 */
function toLogin() {
  window.location.replace("http://localhost:3000/login");
}

/**
 * Redirects to signup page
 */
function toSignup() {
  window.location.replace("http://localhost:3000/signup");
}

/**
 * Redirects to portfolio page
 */
function toPortfolio() {
  window.location.replace("http://localhost:3000/portfolio")
}

/**
 * Adds specific stock to user's portfolio
 */
function addToPortfolio(toAdd) {
  const item = localStorage.getItem('user');  // Gets the user's email 
  const adding = {useremail: item, ticker: toAdd};  // Sets up data to use for fetch
  if(item) {  // If the user is logged in 
    fetch('http://127.0.0.1:5000/v0/addPortfolio', {
      method: 'POST',
      body: JSON.stringify(adding),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        alert('Success!');
      })
  } else {
    alert('Please log in before trying to add to portfolio!');
  }
}

/**
 * Creates the individual page
 * @return {*} Page
 */
const Individual = () => {

  const today = new Date();

  const [stock, setStock] = React.useState({ticker: '', year: today.getFullYear(), month: today.getMonth(), day: today.getDate(), year2: today.getFullYear(), month2: today.getMonth()+1, day2: today.getDate(), interval: "1d"});
  const [ticker, setTicker] = React.useState();
  const [getInfo, setGetInfo] = React.useState({ticker: ''});
  const [view, setView] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const [priceInfo, setPriceInfo] = React.useState([]);
  const [graphType, setGraphType] = React.useState('candlestick');

  /**
   * Changes and sets stock on input change
   */
  const handleInputChange = (event) => {
    const u = stock;
    u['ticker'] = event.target.value;
    const temp = getInfo;
    temp['ticker'] = event.target.value;
    setStock(u);
    setGetInfo(temp);
    setTicker(event.target.value);
  };

  /**
   * Changes the view of the graph on button click
   */
  function changeDuration(duration) {
    const u = stock;
    const durationDay = new Date();

    // Setting the view range to match button clicked
    if(duration === 1) {
      durationDay.setDate(durationDay.getDate()-7);
    } else if (duration === 2) {
      durationDay.setMonth(durationDay.getMonth()-1);
    } else if (duration === 3) {
      durationDay.setMonth(durationDay.getMonth()-6);
    } else {
      durationDay.setFullYear(durationDay.getFullYear()-1);
    }

    u['year'] = durationDay.getFullYear();
    u['month'] = durationDay.getMonth() + 1;
    u['day'] = durationDay.getDate();

    setStock(u);
    setTicker(u['ticker']);

    fetch('http://127.0.0.1:5000/v0/getHistory', {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        fetch('http://127.0.0.1:5000/v0/view?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setView(json);
          })
        return res.json();
      })
  }

  /**
   * Sets up the data on submit
   */
  const handleSubmit = (event) => {
    event.preventDefault();  // no reload on page

    // Putting the stock inside the table 
    fetch('http://127.0.0.1:5000/v0/getHistory', {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // Getting the data from the stock inside the table
        fetch('http://127.0.0.1:5000/v0/view?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setView(json);
          })
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })

    // Putting the stock inside the table for information
    fetch('http://127.0.0.1:5000/v0/add', {
      method: 'POST',
      body: JSON.stringify(getInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.status);
        // Getting price information on stock
        if (res.status === 201) {
          fetch('http://127.0.0.1:5000/v0/ticker?id=' + ticker, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            })
              .then((response) => {
                return response.json();
              })
              .then((json) => {
                setPriceInfo(json);
              })
  
          // Putting information on stock into table
          fetch('http://127.0.0.1:5000/v0/getInfo', {
          method: 'POST',
          body: JSON.stringify(getInfo),
          headers: {
            'Content-Type': 'application/json',
          },
          })
          .then((res) => {
            
          // Getting information on stock from table
          fetch('http://127.0.0.1:5000/v0/retrieveInfo?id=' + ticker, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          })
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              setInfo(json);
            })
  
          // Getting description on stock into table
          fetch('http://127.0.0.1:5000/v0/getDescription?id=' + ticker, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          })
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              setDescription(json);
            })
  
            return res.json();
          })
        }
        return res.json();
      }).catch((error) => {
        alert(`Stock Doesn't Exist`);  // giving error if stock does not exist
      });
  };

  // Setting up data to input into ApexCharts
  const options = {};
  options.series = [];
  const data = {'data': []}
  options.series.push(data);

  // Setting up arrays to hold information from fetch
  let viewDescription = '';
  const viewInformation = [];
  const tickerInfo = [];

  // If the user has submitted and found a stock
  if(view.length >= 1 && description.length >= 1 && info.length >= 1 && priceInfo.length >= 1) {
    
    // Setting up display for price information at the top
    tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 pt-2 inline-block uppercase">{priceInfo[0][0][0]}</p>)
    tickerInfo.push(<p className = "text-2xl font-sans font-bold pl-2 inline-block">{priceInfo[0][0][2]}</p>)
    if(priceInfo[0][0][3][0] === '+') {  // Green text if price change is positive, red if negative
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-green-600">{priceInfo[0][0][3]}</p>)
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-green-600">{priceInfo[0][0][4]}</p>)
    } else {
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-red-600">{priceInfo[0][0][3]}</p>)
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-red-600">{priceInfo[0][0][4]}</p>)
    }
    tickerInfo.push(<button type="button" onClick={() => addToPortfolio(priceInfo[0][0][0].toUpperCase())} className="w-1/6 py-1 mt-2 font-semibold border rounded float-right bg-blue-500">Add to myPortfolio</button>)

    // Setting up information section
    let counter = 0;
    let row = [];
    for (const key in info[0][0][1][0]) {  // For each information portion 
      counter++;  // Maintaining counter to display different div style based on which number row
      if(counter % 4 === 1) {
        row.push(<div className="flex flex-col pb-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 2) {
        row.push(<div className="flex flex-col py-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 3) {
        row.push(<div className="flex flex-col py-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else {
        row.push(<div className="flex flex-col pt-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
        viewInformation.push(<div key = {counter} className = "w-1/3"><dl className="w-5/6 text-gray-900 divide-y divide-gray-200">{row}</dl></div>)
        row = [];
      }
    }
    
    viewDescription = description[0][0][1];

    // Iterating through fetched data on stock and pushing in to display on graph
    const historicalData = view[0][0][1];
    for(let i = historicalData.length-1; i >= 0; i--) {
        const temp = {};
        temp.x = historicalData[i].day;
        temp.y = [];
        temp.y.push(historicalData[i].open);
        temp.y.push(historicalData[i].high);
        temp.y.push(historicalData[i].low);
        temp.y.push(historicalData[i].close);
        options.series[0].data.push(temp);
    }
    options.chart = {};
    options.chart.type = 'candlestick';
    options.chart.height = 350;
    options.xaxis = {};
    options.xaxis.type = 'numeric';
    options.yaxis = {};
    options.yaxis.tooltip = {};
    options.yaxis.tooltip.enabled = true;
  }

  const history = useNavigate();
  const toLogout = () => {
    localStorage.removeItem('user');
    history('/');
  };

  return (
    <div className = "h-screen">
      {/* navbar start */}
      <header className="top-0 sm:px-12 mx-auto flex items-center p-4 bg-blue-900">
        <div className="container flex justify-between h-10 mx-auto">
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 mx-0">
            <img src={Logo} className="w-12 h-12" alt="logo" />
            <div className="text-xl flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-200">
              SLUG FINANCE 
            </div>
          </a>
          <div className="mb-6 items-center justify-start">
            <form onSubmit={handleSubmit}>
              <input aria-label="searching" type="text" name="name" id="search" placeholder="TSLA, AAPL, NVDA" onChange={handleInputChange} className="w-full px-4 py-2 placeholder-gray-500 border border-gray-200 rounded-md focus:outline-none bg-gray-20 border-gray-600" />
            </form>
          </div>
          <div className="items-center space-x-2 flex-shrink-0 hidden lg:flex">
            <li className="flex">
              {localStorage.getItem('user') !== null ? <button type="button" className="px-8 py-3 font-semibold rounded-full text-gray-800 bg-gray-300 hover:bg-gray-400 font-semibold active:bg-gray-500" onClick={toPortfolio}>myPortfolio</button> 
                                                     : <button type="button" className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-gray-800" onClick={toPortfolio}>myPortfolio</button>}
            </li>
            {localStorage.getItem('user') !== null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-red-600 hover:bg-red-700 font-semibold active:bg-red-800" onClick={toLogout}>Log out</button> : null}
            {localStorage.getItem('user') === null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-blue-600 hover:bg-blue-700 font-semibold active:bg-blue-800" onClick={toSignup}>Sign up</button> : null}
            {localStorage.getItem('user') === null ? <button className="self-center px-8 py-3 rounded text-gray-200 bg-gray-600 hover:bg-gray-700 font-semibold active:bg-gray-800" onClick={toLogin}>Log in</button> : null}
          </div>
        </div>
      </header>
      {/* navbar end */}

      <div className = "flex h-3/5">
        <div className = "w-full h-full border-2">
        {tickerInfo}
        <button type="button" onClick={() => setGraphType('line')} className="w-1/12 mr-2 py-1 mt-2 font-semibold border rounded float-right">Line</button>
        <button type="button" onClick={() => setGraphType('candlestick')} className="w-1/12 mr-2 py-1 mt-2 font-semibold border rounded float-right">Candlestick</button>
          <div id="chart" className="h-5/6">
            <ReactApexChart options={options} series={options.series} type={graphType} height={'100%'} />
          </div>
          <button aria-label = "oneWeek" type="button" onClick={() => changeDuration(1)} className="w-1/4 py-3 font-semibold border rounded">1 Week</button>
          <button aria-label = "oneMonth" type="button" onClick={() => changeDuration(2)} className="w-1/4 py-3 font-semibold border rounded">1 Month</button>
          <button aria-label = "sixMonths" type="button" onClick={() => changeDuration(3)} className="w-1/4 py-3 font-semibold border rounded">6 Months</button>
          <button aria-label = "oneYear" type="button" onClick={() => changeDuration(4)} className="w-1/4 py-3 font-semibold border rounded">1 Year</button>
        </div>
      </div>
      <div className = "flex h-2/5">
        <div className = "w-3/4 border-r h-full w-full">
          <p className = "text-2xl font-sans font-semibold p-2">Information</p>
          <div className = "flex px-2">
            {viewInformation}
          </div>
        </div>
        <div className = "w-1/4">
         <p className = "text-2xl font-sans font-semibold p-2">About</p>
         <p className = "text-base font-sans px-2">{viewDescription}</p>
        </div>
      </div>
    </div>
  )
};
  
export default Individual;
