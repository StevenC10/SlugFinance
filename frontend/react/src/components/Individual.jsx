import React from "react";
import './Individual.css';
import ReactApexChart from "react-apexcharts";
import Logo from "../images/test2.png"

const Individual = () => {

  const today = new Date();
  console.log(today.getDate());
  console.log(today.getMonth());
  console.log(today.getFullYear());


  const [stock, setStock] = React.useState({ticker: '', year: today.getFullYear(), month: today.getMonth(), day: today.getDate(), year2: today.getFullYear(), month2: today.getMonth()+1, day2: today.getDate(), interval: "1d"});
  const [ticker, setTicker] = React.useState();
  const [title, setTitle] = React.useState();
  const [getInfo, setGetInfo] = React.useState({ticker: ''});
  const [view, setView] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [description, setDescription] = React.useState([]);

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
    console.log(stock['year'], stock['month'], stock['day']);
    console.log(duration);
    const u = stock;
    const durationDay = new Date();
    if(duration === 1) {
      durationDay.setDate(durationDay.getDate()-7);
      console.log(durationDay);
    } else if (duration === 2) {
      durationDay.setMonth(durationDay.getMonth()-1);
    } else if (duration === 3) {
      durationDay.setMonth(durationDay.getMonth()-6);
    } else if (duration === 4) {
      durationDay.setFullYear(durationDay.getFullYear()-1);
    }
    u['year'] = durationDay.getFullYear();
    u['month'] = durationDay.getMonth();
    u['day'] = durationDay.getDate();
    setStock(u);
    setTicker(u['ticker']);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle(ticker);
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
        setInfo([]);
      });
  };

  const options = {};

  options.series = [];
  const data = {'data': []}
  options.series.push(data);
  let viewDescription = '';
  const viewInformation = [];
  console.log(description);
  console.log(info);
  if(view.length >= 1 && description.length >= 1 && info.length >= 1) {
    console.log(description[0][0][1]);
    console.log(info[0][0][1][0]);
    let counter = 0;
    let row = [];
    for (const key in info[0][0][1][0]) {
      counter++;
      if(counter % 4 === 1) {
        row.push(<div class="flex flex-col pb-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{key}</dt>
        <dd class="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 2) {
        row.push(<div class="flex flex-col py-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{key}</dt>
        <dd class="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 3) {
        row.push(<div class="flex flex-col py-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{key}</dt>
        <dd class="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
      } else if(counter % 4 === 0) {
        row.push(<div class="flex flex-col pt-3">
        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{key}</dt>
        <dd class="text-lg font-semibold">{info[0][0][1][0][key]}</dd>
        </div>);
        viewInformation.push(<div class = "w-1/3"><dl class="w-5/6 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">{row}</dl></div>)
        row = [];
      }
    }
    console.log(view);
    const historicalData = view[0][0][1];
    console.log(historicalData);
    viewDescription = description[0][0][1];
    console.log(historicalData.length);
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

    console.log(JSON.stringify(options));
  }

  return (
    <div class = "h-screen">
      <form onSubmit = {handleSubmit}>
         <input 
         type = "text" 
         name = "name"
         onChange= {handleInputChange}
         />
         <button type = "submit">Submit</button>
      </form>
      <div class = "flex h-3/5">
        <div class = "w-full h-full border-2">
        <p class = "text-2xl font-sans font-semibold p-2">{title}</p>
          <div id="chart">
            <ReactApexChart options={options} series={options.series} type="candlestick" height={500} />
          </div>
          <button type="button" onClick={() => changeDuration('1')} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100">1 Week</button>
          <button type="button" onClick={() => changeDuration('2')} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100">1 Month</button>
          <button type="button" onClick={() => changeDuration('3')} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100">6 Months</button>
          <button type="button" onClick={() => changeDuration('4')} className="w-1/4 py-3 font-semibold border rounded dark:border-gray-100 dark:text-gray-100">1 Year</button>
        </div>
      </div>
      <div class = "flex h-2/5">
        <div class = "w-3/4 border-2 h-full w-full">
          <p class = "text-2xl font-sans font-semibold p-2">Information</p>
          {/* <div class = "h-5/6 border w-full">
            <div class = "border flex h-1/4 w-full">
              <div class = "border h-full w-1/2"></div>
              <div class = "border h-full w-1/2"></div>
            </div>
            <div class = "border flex h-1/4 w-full">
              <div class = "border h-full w-1/2"></div>
              <div class = "border h-full w-1/2"></div>
            </div>
            <div class = "border flex h-1/4 w-full">
              <div class = "border h-full w-1/2"></div>
              <div class = "border h-full w-1/2"></div>
            </div>
            <div class = "border flex h-1/4 w-full">
              <div class = "border h-full w-1/2"></div>
              <div class = "border h-full w-1/2"></div>
            </div>
          </div> */}
          <div class = "flex px-2">
            {viewInformation}
          </div>
        </div>
        <div class = "w-1/4 border-2">
         <p class = "text-2xl font-sans font-semibold p-2">About</p>
         <p class = "text-base font-sans px-2">{viewDescription}</p>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div>
  //     <nav>
  //       <div id= "nav-logo-section" class="nav-section">
  //        <img src={Logo} alt="logo" width="30"/>
  //        <div><b>Slug Finance</b></div>
  //       </div>
  //       <div id= "nav-search-section" class="nav-section">
  //         <form onSubmit = {handleSubmit}>
  //         <input 
  //         type = "text" 
  //         name = "name"
  //         onChange= {handleInputChange}
  //         />
  //         <button type = "submit">Submit</button>
  //         </form>
  //       </div>
  //       <div id= "nav-button-section" class="nav-section">
  //         <a href="/login">myPortfolio</a>
  //         <a href="/login">Login</a>
  //         <a href="/signup">Signup</a>
  //       </div>
  //     </nav>
  //     <main>
  //       <div class = "wrapper">
  //         <div class = "graph-section main-section">
  //           <div id="chart">
  //             <ReactApexChart options={options} series={options.series} type="candlestick" height={500} />
  //           </div>
  //         </div>
  //         <div class = "info-section main-section">
  //           <h1>Information</h1>
  //           <ul>{viewAbout}</ul>
  //         </div>
  //         <div class = "about-section main-section">
  //           <h1>About</h1>
  //           <p>{viewDescription}</p>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );
};
  
export default Individual;
