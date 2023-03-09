
import React, {useState,useEffect} from 'react';
import {FaSistrix, FaBars} from "react-icons/fa"
import Logo from '../images/test2.png'
import ReactApexChart from "react-apexcharts";
//import { createChartData } from './Chartdata';
//import {useRef} from 'react;

export const tickerContext = React.createContext();

const Home = () => {
  
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [c1Data, setC1Data] = useState([]);
  const [c2Data, setC2Data] = useState([]);
  const [c3Data, setC3Data] = useState([]);
  const [c4Data, setC4Data] = useState([]);
  const [c5Data, setC5Data] = useState([]);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  
  //let effectRan=false;
  //const [chartData,setChartData] = useState({});
  //const effectRan = useRef(false);
  //chartData.info=[];

  
  
  /* modularizing the graph data code isn't working out, come back later
 for(let i=0; i<1; i++){}
        const f = async()=>{
          const response= await createChartData("TSLA")
          setChartData(response);
          
          console.log(response);
          console.log(chartData);
        }
        f();   
        return () => {
          console.log("effectRan");
          effectRan.current = true;
        }
      }
      
  },[chartData,effectRan]);
  effectRan.current = false;
  console.log(chartData);
        //console.log(chartData);
        //console.log(chartData.info);
        //console.log(chartOptions);

*/
  //CHART 1
useEffect(()=> {
  ( async()=>{
      await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
        method: 'POST',
        body: `{"ticker": "TSLA",`
              + `"year": 2023,`
              + `"month": 2,`
              + `"day": 1,`
              + `"year2": `+year+`,`
              + `"month2": `+month+`,`
              + `"day2": `+day+`,`
              + `"interval": "1d"`
              +"}",
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
    //AbortController.abort();
  };
},[day,month,year]);


const c1Options = {};
c1Options.series = [];
const c1GraphData = {'data': []}
c1Options.series.push(c1GraphData);
if (c1Data.length >= 1){
  let c1History= c1Data[0][0][1];

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
  c1Options.xaxis.type = 'numeric';
  c1Options.yaxis = {};
  c1Options.yaxis.tooltip = {};
  c1Options.yaxis.tooltip.enabled = true;
}


  //CHART 2
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "NVDA",`
                + `"year": 2023,`
                + `"month": 2,`
                + `"day": 1,`
                + `"year2": `+year+`,`
                + `"month2": `+month+`,`
                + `"day2": `+day+`,`
                + `"interval": "1d"`
                +"}",
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
      //AbortController.abort();
    };
  },[day,month,year]);

  const c2Options = {};
  c2Options.series = [];
  const c2GraphData = {'data': []}
  c2Options.series.push(c2GraphData);

  if (c2Data.length >= 1){
    let c2History= c2Data[0][0][1];

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
    c2Options.xaxis.type = 'numeric';
    c2Options.yaxis = {};
    c2Options.yaxis.tooltip = {};
    c2Options.yaxis.tooltip.enabled = true;
  }

  //CHART 3
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "DOW",`
          + `"year": 2023,`
          + `"month": 2,`
          + `"day": 1,`
          + `"year2": `+year+`,`
          + `"month2": `+month+`,`
          + `"day2": `+day+`,`
          + `"interval": "1d"`
          +"}",
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
      //AbortController.abort();
    };
  },[day,month,year]);
  const c3Options = {};
  c3Options.series = [];
  const c3GraphData = {'data': []}
  c3Options.series.push(c3GraphData);

  if (c3Data.length >= 1){
    let c3History= c3Data[0][0][1];

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
    c3Options.xaxis.type = 'numeric';
    c3Options.yaxis = {};
    c3Options.yaxis.tooltip = {};
    c3Options.yaxis.tooltip.enabled = true;
  }


  //CHART 4
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "GOOGL",`
          + `"year": 2023,`
          + `"month": 2,`
          + `"day": 1,`
          + `"year2": `+year+`,`
          + `"month2": `+month+`,`
          + `"day2": `+day+`,`
          + `"interval": "1d"`
          +"}",
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
      //AbortController.abort();
    };
  },[day,month,year]);
  const c4Options = {};
  c4Options.series = [];
  const c4GraphData = {'data': []}
  c4Options.series.push(c4GraphData);

  if (c4Data.length >= 1){
    let c4History= c4Data[0][0][1];

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
    c4Options.xaxis.type = 'numeric';
    c4Options.yaxis = {};
    c4Options.yaxis.tooltip = {};
    c4Options.yaxis.tooltip.enabled = true;
  }

  //CHART 5
  useEffect(()=> {
    ( async()=>{
        await fetch(`http://127.0.0.1:5000/v0/getHistory`, {
          method: 'POST',
          body: `{"ticker": "AMZN",`
          + `"year": 2023,`
          + `"month": 2,`
          + `"day": 1,`
          + `"year2": `+year+`,`
          + `"month2": `+month+`,`
          + `"day2": `+day+`,`
          + `"interval": "1d"`
          +"}",
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

      //AbortController.abort();
    };
  },[day,month,year]);

  const c5Options = {};
  c5Options.series = [];
  const c5GraphData = {'data': []}
  c5Options.series.push(c5GraphData);

  if (c5Data.length >= 1){
    let c5History= c5Data[0][0][1];

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
    //c5Options.chart.height = 350;
    c5Options.title = {};
    c5Options.title.text = 'AMZN';
    c5Options.title.align = 'left';
    c5Options.xaxis = {};
    c5Options.xaxis.type = 'numeric';
    c5Options.yaxis = {};
    c5Options.yaxis.tooltip = {};
    c5Options.yaxis.tooltip.enabled = true;
    
  }

  // search bar ticker context
  
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
            <form className="flex flex-grow" style={{background:'white', margin:'2px'}} >
              <input className="flex flex-grow focus:outline-none" placeholder="TSLA, AAPL, NVDA..."
              type = "text" 
              name = "name"
              />
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
              { <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#SLUGFINANCE"
                >
                  Watchlist
                </a>
              </li> }
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="signup"
                >
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="login"
                >
                  Log In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="box-border text-6xl h-screen " 
        style={{backgroundImage: 'url(https://knowledge.wharton.upenn.edu/wp-content/uploads/2020/11/Stock-Market-900x387.jpg)',
                    backgroundSize: "cover",
                    align: "center",
                    height:1000
                    }}>
        <div className="grid grid-rows-2 w-2/3 h-screen"style={{paddingLeft:"60px"}}>
          <p className="grid content-end text-yellow-200 font-serif font-mono font-bold">
            The price is what you pay, value is what you get.
          </p>
          <form className="nav-item" style={{paddingTop:'10px'}} action="Individual" >
              <input className="flex w-full focus:outline-none" placeholder="TSLA, AAPL, NVDA..."
              type = "text" 
              name = "name"
              />
            </form>
        </div>
        
      </div>
      
      <div className="flex grid grid-col-4 grid-row-4 grid-flow-col-dense h-screen" id="chart">
        <div className="px-3 row-span-4 col-span-2 row-start-1">
          <ReactApexChart options={c1Options} series={c1Options.series} type="candlestick" height={800} width={850}/>
        </div>
        <div className="px-3 row-start-1">
          
          <ReactApexChart options={c2Options} series={c2Options.series} type="line" height={300} width={400}/>
        </div>
        <div className="px-3 row-start-1">
          <ReactApexChart options={c3Options} series={c3Options.series} type="line" height={300} width={400}/>
        </div>
        <div className="px-3 row-start-2">
          
          <ReactApexChart options={c4Options} series={c4Options.series} type="line" height={300} width={400}/>
        </div>
        <div className="px-3 row-start-2">
          
          <ReactApexChart options={c5Options} series={c5Options.series} type="line" height={300} width={400}/>
        </div>
      </div>
      <footer className="bg-[#27a5f8] h-48 px-12 pt-5" >
        <div className="flex bold text-4xl">About SlugFinance</div>
        <div className="flex text-2xl">We are a team of students studying computer science at University of California Santa Cruz.</div>

      </footer>
      
      
    </div>
  );
};
  
export default Home;
/*
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
}*/