import React from "react";
import ReactApexChart from "react-apexcharts";

import Logo from "../images/test2.png"
// from mamba ui

function toLogin() {
  window.location.replace("http://localhost:3000/login");
}

function toSignup() {
  window.location.replace("http://localhost:3000/signup");
}

function toPortfolio() {
  window.location.replace("http://localhost:3000/portfolio")
}

const Individual = () => {

  const today = new Date();
  console.log(today.getDate());
  console.log(today.getMonth());


  const [stock, setStock] = React.useState({ticker: '', year: today.getFullYear(), month: today.getMonth(), day: today.getDate(), year2: today.getFullYear(), month2: today.getMonth()+1, day2: today.getDate(), interval: "1d"});
  const [ticker, setTicker] = React.useState();
  const [getInfo, setGetInfo] = React.useState({ticker: ''});
  const [view, setView] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const [priceInfo, setPriceInfo] = React.useState([]);

  console.log(stock);

  const handleInputChange = (event) => {
    const u = stock;
    u['ticker'] = event.target.value;
    const temp = getInfo;
    temp['ticker'] = event.target.value;
    setStock(u);
    setGetInfo(temp);
    setTicker(event.target.value);
  };

  function changeDuration(duration) {
    // console.log(stock['year'], stock['month'], stock['day']);
    // console.log(duration);
    const u = stock;
    const durationDay = new Date();
    if(duration === 1) {
      durationDay.setDate(durationDay.getDate()-7);

      // console.log(durationDay);
    } else if (duration === 2) {
      durationDay.setMonth(durationDay.getMonth()-1);
    } else if (duration === 3) {
      durationDay.setMonth(durationDay.getMonth()-6);
    } else if (duration === 4) {
      durationDay.setFullYear(durationDay.getFullYear()-1);
    }
    u['year'] = durationDay.getFullYear();
    u['month'] = durationDay.getMonth() + 1;
    u['day'] = durationDay.getDate();
    setStock(u);
    setTicker(u['ticker']);
    // console.log(stock['year'], stock['month'], stock['day']);
    fetch('http://127.0.0.1:5000/v0/getHistory', {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        fetch('http://127.0.0.1:5000/v0/view?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            setView(json);
          })
          .catch((error) => {
            console.log(error);
            setView([]);
          });
        return res.json();
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(stock);
    fetch('http://127.0.0.1:5000/v0/getHistory', {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        fetch('http://127.0.0.1:5000/v0/view?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            setView(json);
          })
          .catch((error) => {
            console.log(error);
            setView([]);
          });
        return res.json();
      })


    fetch('http://127.0.0.1:5000/v0/add', {
      method: 'POST',
      body: JSON.stringify(getInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        fetch('http://127.0.0.1:5000/v0/ticker?id=' + ticker, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
          })
            .then((response) => {
              if (!response.ok) {
                throw response;
              }
              return response.json();
            })
            .then((json) => {
              setPriceInfo(json);
            })
            .catch((error) => {
              console.log(error);
              setPriceInfo([]);
            });

        fetch('http://127.0.0.1:5000/v0/getInfo', {
        method: 'POST',
        body: JSON.stringify(getInfo),
        headers: {
          'Content-Type': 'application/json',
        },
        })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          
        fetch('http://127.0.0.1:5000/v0/retrieveInfo?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            setInfo(json);
          })
          .catch((error) => {
            console.log(error);
            setInfo([]);
          });

        fetch('http://127.0.0.1:5000/v0/getDescription?id=' + ticker, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            setDescription(json);
          })
          .catch((error) => {
            console.log(error);
            setDescription([]);
          });

          return res.json();
        })
        return res.json();
      }).catch((error) => {
        console.log(error);
        alert(`Doesn't Exist`);
      });
  };

  // console.log(info);
  const options = {};

  options.series = [];
  const data = {'data': []}
  options.series.push(data);
  let viewDescription = '';
  const viewInformation = [];
  // console.log(description);
  // console.log(info);
  const tickerInfo = [];
  if(view.length >= 1 && description.length >= 1 && info.length >= 1 && priceInfo.length >= 1) {
    // console.log(description[0][0][1]);
    // console.log(info[0][0][1][0]);
    // console.log(priceInfo[0][0][2][0]);
    tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 pt-2 inline-block uppercase">{priceInfo[0][0][0]}</p>)
    tickerInfo.push(<p className = "text-2xl font-sans font-bold pl-2 inline-block">{priceInfo[0][0][2]}</p>)
    if(priceInfo[0][0][2][0] === '+') {
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-green-600">{priceInfo[0][0][3]}</p>)
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-green-600">{priceInfo[0][0][4]}</p>)
    } else {
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-red-600">{priceInfo[0][0][3]}</p>)
      tickerInfo.push(<p className = "text-2xl font-sans font-semibold pl-2 inline-block text-red-600">{priceInfo[0][0][4]}</p>)
    }

    let counter = 0;
    let row = [];
    for (const key in info[0][0][1][0]) {
      counter++;
      if(counter % 4 === 1) {
        row.push(<div className="flex flex-col pb-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold text-gray-500">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 2) {
        row.push(<div className="flex flex-col py-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold text-gray-500">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 3) {
        row.push(<div className="flex flex-col py-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold text-gray-500">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 0) {
        row.push(<div className="flex flex-col pt-3">
        <dt key = {key} className="mb-1 text-gray-400 md:text-lg">{key}</dt>
        <dd key = {info[0][0][1][0][key]} className="text-lg font-semibold text-gray-500">{info[0][0][1][0][key]}</dd>
        </div>);
        viewInformation.push(<div key = {counter} className = "w-1/3"><dl className="w-5/6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">{row}</dl></div>)
        row = [];
      }
    }
    
    // console.log(view);
    // console.log(priceInfo);
    const historicalData = view[0][0][1];
    // console.log(historicalData);
    viewDescription = description[0][0][1];
    // console.log(historicalData.length);
    for(let i = historicalData.length-1; i >= 0; i--) {
        const temp = {};
        // temp.x = new Date (historicalData[i].day);
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
    // options.title = {};
    // options.title.text = stock['ticker'];
    // options.title.align = 'left';
    options.xaxis = {};
    options.xaxis.type = 'numeric';
    options.yaxis = {};
    options.yaxis.tooltip = {};
    options.yaxis.tooltip.enabled = true;

    // console.log(JSON.stringify(options));
  }

  return (
    <div className = "h-screen">
      {/* <form onSubmit = {handleSubmit}>
         <input 
         type = "text" 
         name = "name"
         onChange= {handleInputChange}
         />
         <button type = "submit">Submit</button>
      </form> */}
      {/* navbar start */}
      <header className="sticky top-0 sm:px-12 mx-auto flex items-center p-4 bg-blue-900">
        <div className="container flex justify-between h-10 mx-auto">
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 mx-0">
            <img src={Logo} className="w-12 h-12" alt="logo" />
            <div className="text-xl flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-200">
              SLUG FINANCE 
            </div>
          </a>
          <div className="mb-6 items-center justify-start">
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" id="search" placeholder="TSLA, AAPL, NVDA" onChange={handleInputChange} className="w-full px-4 py-2 placeholder-gray-500 border border-gray-200 rounded-md focus:outline-none bg-gray-20 border-gray-600" />
              {/* <button type = "submit">Submit</button> */}
            </form>
          </div>
          <div className="items-center space-x-2 flex-shrink-0 hidden lg:flex">
            <li className="flex">
              {/* <a rel="noopener noreferrer" href="/" className="flex items-center text-lg px-4 font-bold -mb-1 text-yellow-300">myPortfolio</a> */}
              <button type="button" className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-gray-800" onClick={toPortfolio}>myPortfolio</button>
            </li>
            <button className="self-center px-8 py-3 rounded text-gray-200 bg-blue-600 hover:bg-blue-700 font-semibold active:bg-blue-800" onClick={toSignup}>Sign up</button>
            <button className="self-center px-8 py-3 rounded text-gray-200 bg-gray-600 hover:bg-gray-700 font-semibold active:bg-gray-800" onClick={toLogin}>Log in</button>
          </div>
        </div>
      </header>
      {/* navbar end */}

      <div className = "flex h-3/5">
        <div className = "w-full h-full border-2">
        {tickerInfo}
        <button type="button" className="w-1/6 py-1 mt-2 font-semibold border rounded dark:border-gray-100 dark:text-gray-100 float-right bg-blue-500">Add to myPortfolio</button>
          <div id="chart" className="h-5/6">
            <ReactApexChart options={options} series={options.series} type="candlestick" height={'100%'} />
          </div>
          <button type="button" onClick={() => changeDuration(1)} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-500 dark:text-gray-500">1 Week</button>
          <button type="button" onClick={() => changeDuration(2)} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-500 dark:text-gray-500">1 Month</button>
          <button type="button" onClick={() => changeDuration(3)} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-500 dark:text-gray-500">6 Months</button>
          <button type="button" onClick={() => changeDuration(4)} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-500 dark:text-gray-500">1 Year</button>
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
