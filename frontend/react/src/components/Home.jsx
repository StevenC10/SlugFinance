
import React, {useState,useEffect} from 'react';
import {FaSistrix, FaBars} from "react-icons/fa"
import Logo from '../images/test2.png'
import ReactApexChart from "react-apexcharts";


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

const Home = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setSymbol(stock);
  }
  const [symbol, setSymbol] = useState();
  const [stock, setStock] = useState();
  const [stockData, setStockData] = useState([]);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [c1Data, setC1Data] = useState([]);
  const [c2Data, setC2Data] = useState([]);
  const [c3Data, setC3Data] = useState([]);
  const [c4Data, setC4Data] = useState([]);
  const [c5Data, setC5Data] = useState([]);
  const stonks = stockData[0];
  
  let price = undefined;
  let change = undefined; 
  let ticker = undefined;
  let dailyChange = undefined;
  useEffect(() => {
    getStock(symbol, setStockData);
  }, [symbol]);
  if(stonks !== undefined) {
    price = stonks[0][1];
    change = stonks[0][2];
    ticker = stonks[0][0];
    dailyChange = stonks[0][3];
  }

  //CHART 1
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "TSLA"}`,
          headers: new Headers({
            'Content-Type': 'application/json',
            })
        })

        let c1d = await fetch(`http://127.0.0.1:5000/v0/view?id=TSLA`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            })
          }).then((response) => {
            if(!response.ok) {
              throw response;
            }
            return response.json();
          })
          setC1Data(c1d);
    }) ();
    return() =>{
      console.log("fetch");
      //AbortController.abort();
    };
  },[]);
  const c1Options = {};
  c1Options.series = [];
  const c1GraphData = {'data': []}
  c1Options.series.push(c1GraphData);
  if (c1Data.length >= 1){
    let c1History= c1Data[0][0][1];
    console.log(c1History);

    for (let i=c1History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c1History[i].day);
        temp.y = [];
        temp.y.push(c1History[i].open);
        temp.y.push(c1History[i].high);
        temp.y.push(c1History[i].low);
        temp.y.push(c1History[i].close);
        c1Options.series[0].data.push(temp);
    }
    c1Options.chart = {};
    c1Options.chart.type = 'candlestick';
    c1Options.chart.height = 350;
    c1Options.title = {};
    c1Options.title.text = 'TSLA';
    c1Options.title.align = 'left';
    c1Options.xaxis = {};
    c1Options.xaxis.type = '';
    c1Options.yaxis = {};
    c1Options.yaxis.tooltip = {};
    c1Options.yaxis.tooltip.enabled = true;
  }


  //CHART 2
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "NVDA"}`,
          headers: new Headers({
            'Content-Type': 'application/json',
            })
        })

        let c2d = await fetch(`http://127.0.0.1:5000/v0/view?id=NVDA`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            })
          }).then((response) => {
            if(!response.ok) {
              throw response;
            }
            return response.json();
          })
          setC2Data(c2d);
    }) ();
    return() =>{
      console.log("fetch");
      //AbortController.abort();
    };
  },[]);
  const c2Options = {};
  c2Options.series = [];
  const c2GraphData = {'data': []}
  c2Options.series.push(c2GraphData);

  if (c2Data.length >= 1){
    let c2History= c2Data[0][0][1];
    console.log(c2History);

    for (let i=c2History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c2History[i].day);
        temp.y = [];
        temp.y.push(c2History[i].open);
        temp.y.push(c2History[i].high);
        temp.y.push(c2History[i].low);
        temp.y.push(c2History[i].close);
        c2Options.series[0].data.push(temp);
    }
    c2Options.chart = {};
    c2Options.chart.type = 'candlestick';
    c2Options.chart.height = 350;
    c2Options.title = {};
    c2Options.title.text = 'NVDA';
    c2Options.title.align = 'left';
    c2Options.xaxis = {};
    c2Options.xaxis.type = 'day';
    c2Options.yaxis = {};
    c2Options.yaxis.tooltip = {};
    c2Options.yaxis.tooltip.enabled = true;
  }

  //CHART 3
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "DOW"}`,
          headers: new Headers({
            'Content-Type': 'application/json',
            })
        })

        let c3d = await fetch(`http://127.0.0.1:5000/v0/view?id=DOW`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            })
          }).then((response) => {
            if(!response.ok) {
              throw response;
            }
            return response.json();
          })
          setC3Data(c3d);
    }) ();
    return() =>{
      console.log("fetch");
      //AbortController.abort();
    };
  },[]);
  const c3Options = {};
  c3Options.series = [];
  const c3GraphData = {'data': []}
  c3Options.series.push(c3GraphData);

  if (c3Data.length >= 1){
    let c3History= c3Data[0][0][1];
    console.log(c3History);

    for (let i=c3History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c3History[i].day);
        temp.y = [];
        temp.y.push(c3History[i].open);
        temp.y.push(c3History[i].high);
        temp.y.push(c3History[i].low);
        temp.y.push(c3History[i].close);
        c3Options.series[0].data.push(temp);
    }
    c3Options.chart = {};
    c3Options.chart.type = 'candlestick';
    c3Options.chart.height = 350;
    c3Options.title = {};
    c3Options.title.text = 'DOW';
    c3Options.title.align = 'left';
    c3Options.xaxis = {};
    c3Options.xaxis.type = 'day';
    c3Options.yaxis = {};
    c3Options.yaxis.tooltip = {};
    c3Options.yaxis.tooltip.enabled = true;
  }


  //CHART 4
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "GOOGL"}`,
          headers: new Headers({
            'Content-Type': 'application/json',
            })
        })

        let c4d = await fetch(`http://127.0.0.1:5000/v0/view?id=GOOGL`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            })
          }).then((response) => {
            if(!response.ok) {
              throw response;
            }
            return response.json();
          })
          setC4Data(c4d);
    }) ();
    return() =>{
      console.log("fetch");
      //AbortController.abort();
    };
  },[]);
  const c4Options = {};
  c4Options.series = [];
  const c4GraphData = {'data': []}
  c4Options.series.push(c4GraphData);

  if (c4Data.length >= 1){
    let c4History= c4Data[0][0][1];
    console.log(c4History);

    for (let i=c4History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c4History[i].day);
        temp.y = [];
        temp.y.push(c4History[i].open);
        temp.y.push(c4History[i].high);
        temp.y.push(c4History[i].low);
        temp.y.push(c4History[i].close);
        c4Options.series[0].data.push(temp);
    }
    c4Options.chart = {};
    c4Options.chart.type = 'candlestick';
    c4Options.chart.height = 350;
    c4Options.title = {};
    c4Options.title.text = 'GOOGL';
    c4Options.title.align = 'left';
    c4Options.xaxis = {};
    c4Options.xaxis.type = 'day';
    c4Options.yaxis = {};
    c4Options.yaxis.tooltip = {};
    c4Options.yaxis.tooltip.enabled = true;
  }

  //CHART 4
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "AMZN"}`,
          headers: new Headers({
            'Content-Type': 'application/json',
            })
        })

        let c5d = await fetch(`http://127.0.0.1:5000/v0/view?id=AMZN`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            })
          }).then((response) => {
            if(!response.ok) {
              throw response;
            }
            return response.json();
          })
          setC5Data(c5d);
    }) ();
    return() =>{
      console.log("fetch");
      //AbortController.abort();
    };
  },[]);
  const c5Options = {};
  c5Options.series = [];
  const c5GraphData = {'data': []}
  c5Options.series.push(c5GraphData);

  if (c5Data.length >= 1){
    let c5History= c5Data[0][0][1];
    console.log(c5History);

    for (let i=c5History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c5History[i].day);
        temp.y = [];
        temp.y.push(c5History[i].open);
        temp.y.push(c5History[i].high);
        temp.y.push(c5History[i].low);
        temp.y.push(c5History[i].close);
        c5Options.series[0].data.push(temp);
    }
    c5Options.chart = {};
    c5Options.chart.type = 'candlestick';
    c5Options.chart.height = 350;
    c5Options.title = {};
    c5Options.title.text = 'AMZN';
    c5Options.title.align = 'left';
    c5Options.xaxis = {};
    c5Options.xaxis.type = 'day';
    c5Options.yaxis = {};
    c5Options.yaxis.tooltip = {};
    c5Options.yaxis.tooltip.enabled = true;
  }

  //RENDER WEBPAGE
  return (
    <div className="overflow-auto">
      <nav className="overflow-hidden relative flex items-center justify-between px-2 py-3 bg-[#27a5f8] sticky top-0">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <img className="flex inline-block" src={Logo} width='40' height='40' alt=''/>
          <div className="inline-block w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#SLUGFINANCE"
            >
              SLUG FINANCE 
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i><FaBars/></i>
            </button>
          </div>
          <div className="flex flex-grow inline-block">
            <form className="flex flex-grow"onSubmit = {handleSubmit} style={{background:'white', margin:'2px'}} >
              <input className="flex flex-grow focus:outline-none" placeholder="TSLA, AAPL, NVDA..."
              type = "text" 
              name = "name"
              onChange= {(event) =>
                setStock(event.target.value)}/>
              <button className="flex-end" type="submit" > <FaSistrix/></button>
            </form>
          </div>
          <div
            className={
              "lg:flex flex-grow inline-block items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/* <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#SLUGFINANCE"
                >
                  <FaFacebookSquare/>
                  <i className="fab text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Share</span>
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="signup"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Sign Up</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="login"
                >
                  <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Log In</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="flex justify-center box-border font-mono font-bold text-6xl items-center text-center overflow-visible" 
        style={{backgroundImage: 'url(https://knowledge.wharton.upenn.edu/wp-content/uploads/2020/11/Stock-Market-900x387.jpg)',
                    backgroundSize: "cover",
                    align: "center",
                    height:1000
                    }}>
        <div className="flex items-center text-yellow-200 font-serif h-screen">
          The price is what you pay, value is what you get.
        </div>
      </div>
      
      <div className="flex grid grid-col-4 grid-row-4 grid-flow-col-dense gap-2 h-screen" id="chart" style={{height:10}}  >
        <div className="row-span-4 col-span-2">
        <ReactApexChart options={c1Options} series={c1Options.series} type="candlestick" height={800} width={1000}/>
        </div>
        <div className="row-end-1">
          2
          <ReactApexChart options={c2Options} series={c2Options.series} type="candlestick" height={300} width={400}/>
        </div>
        <div className="row-end-1">
          3
          <ReactApexChart options={c3Options} series={c3Options.series} type="candlestick" height={300} width={400}/>
        </div>
        <div className="row-start-3">
          4
          <ReactApexChart options={c4Options} series={c4Options.series} type="candlestick" height={300} width={400}/>
        </div>
        <div className="row-end-4">
          5
          <ReactApexChart options={c5Options} series={c5Options.series} type="candlestick" height={300} width={400}/>
        </div>
      </div>
      
      
      
    </div>
  );
};
  
export default Home;
/*<table>
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
        
      </ol>*/