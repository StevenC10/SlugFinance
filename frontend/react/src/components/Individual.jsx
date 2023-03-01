import React from "react";
import './Individual.css';
import ReactApexChart from "react-apexcharts";
import Logo from "../images/test2.png"

const Individual = () => {

  const [stock, setStock] = React.useState({ticker: ''});
  const [ticker, setTicker] = React.useState();
  const [view, setView] = React.useState([]);

  const handleInputChange = (event) => {
    const u = stock;
    u['ticker'] = event.target.value;
    setStock(u);
    setTicker(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stock);
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
      .catch((error) => {
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
      });
  };


  const options = {};

  options.series = [];
  const data = {'data': []}
  options.series.push(data);
  if(view.length >= 1) {
    console.log(view);
    const historicalData = view[0][0][1];
    console.log(historicalData);
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
    options.title = {};
    options.title.text = ticker;
    options.title.align = 'left';
    options.xaxis = {};
    options.xaxis.type = 'numeric';
    options.yaxis = {};
    options.yaxis.tooltip = {};
    options.yaxis.tooltip.enabled = true;

    console.log(JSON.stringify(options));

  }

  return (
    <div>
      <nav>
        <div id= "nav-logo-section" class="nav-section">
         <img src={Logo} alt="logo" width="30"/>
         <div><b>Slug Finance</b></div>
        </div>
        <div id= "nav-search-section" class="nav-section">
          <form onSubmit = {handleSubmit}>
          <input 
          type = "text" 
          name = "name"
          onChange= {handleInputChange}
          />
          <button type = "submit">Submit</button>
          </form>
        </div>
        <div id= "nav-button-section" class="nav-section">
          <a href="/login">myPortfolio</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </div>
      </nav>
      <main>
        <div class = "wrapper">
          <div class = "graph-section main-section">
            <div id="chart">
              <ReactApexChart options={options} series={options.series} type="candlestick" height={500} />
            </div>
          </div>
          <div class = "info-section main-section">
            <h1>Information</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div class = "about-section main-section">
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
  
export default Individual;
