import React from "react";
import './Individual.css';
import ReactApexChart from "react-apexcharts";

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
  const lister = [];

  options.series = [];
  const data = {'data': []}
  options.series.push(data);
  if(view.length >= 1) {
    console.log(view);
    const historicalData = view[0][0][1];
    console.log(historicalData);
    for(let i = historicalData.length-1; i >= 0; i--) {
        lister.push(<div key = {i}>{historicalData[i].close} {historicalData[i].day} {historicalData[i].high} {historicalData[i].low} {historicalData[i].open} </div>);
        const temp = {};
        temp.x = new Date (historicalData[i].day);
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
    options.title.text = 'CandleStick Chart';
    options.title.align = 'left';
    options.xaxis = {};
    options.xaxis.type = 'datetime';
    options.yaxis = {};
    options.yaxis.tooltip = {};
    options.yaxis.tooltip.enabled = true;

    console.log(JSON.stringify(options));

  }

  return (
    <div>
      <h1>Individual Page</h1>
      <form onSubmit = {handleSubmit}>
        <input 
        type = "text" 
        name = "name"
        onChange= {handleInputChange}
        />
        <button type = "submit">Submit</button>
      </form>
      <div id="chart">
        <ReactApexChart options={options} series={options.series} type="candlestick" height={350} />
      </div>
      {lister}
    </div>
  );
};
  
export default Individual;
