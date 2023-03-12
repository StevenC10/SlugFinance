
import React, {useState,useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import {useRef} from 'react';
import Navbar from './Navbar';

import Amazon from '../images/Amazon.png';
import Apple from '../images/Apple.png';
import Google from '../images/Google.png';
import Microsoft from '../images/MSFT.png';
import Meta from '../images/Meta.png';
import Netflix from '../images/Netflix.png';

// import homeBackground from '../images/homeImage1.jpg';

export const tickerContext = React.createContext();

const Home = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const day = today.getDate();
  const baseDay = `"`+year+`-`+month+`-`+day;
  const yesterday = new Date(Date.now() - 86400000);
  const [c1Data, setC1Data] = useState({});
  const [icon1, setIcon1] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const [icon2, setIcon2] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const [icon3, setIcon3] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const [icon4, setIcon4] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const [icon5, setIcon5] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const [icon6, setIcon6] = useState([[["",[{high:0,close:0,low:0,open:0,day:baseDay}]]]]);
  const iconBody = useRef({ticker: '', year: yesterday.getFullYear(), month: yesterday.getMonth()+1, day: yesterday.getDate(), year2: year, month2: month, day2: day, interval: "1d"});

  useEffect(()=> {
    let tempDate=new Date(Date.now()-7890000000);

  
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: `{"ticker": "TSLA",`
        + `"year": `+tempDate.getFullYear()+`,`
        + `"month": `+(tempDate.getMonth()+1)+`,`
        + `"day": `+tempDate.getDate()+`,`
        + `"year2": `+year+`,`
        + `"month2": `+month+`,`
        + `"day2": `+day+`,`
        + `"interval": "1d"`
        +"}",
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    });
    
    fetch(`http://127.0.0.1:5000/v0/view?id=TSLA`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setC1Data(json);
      return(json);
    });

    // Icon 1
    let temp=iconBody.current;
    temp.ticker="META"
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
    fetch(`http://127.0.0.1:5000/v0/view?id=META`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon1(json);
      return(json);
    })
    
    // Icon 2
    temp.ticker="AAPL";
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
      fetch(`http://127.0.0.1:5000/v0/view?id=AAPL`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon2(json);
      return(json);
    })
    
    // Icon 3
    temp.ticker="AMZN";
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
      fetch(`http://127.0.0.1:5000/v0/view?id=AMZN`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon3(json);
      return(json);
    })
    
    // Icon 4
    temp.ticker="NFLX";
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
      fetch(`http://127.0.0.1:5000/v0/view?id=NFLX`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon4(json);
      return(json);
    })
    
    // Icon 5
    temp.ticker="GOOGL";
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
      fetch(`http://127.0.0.1:5000/v0/view?id=GOOGL`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon5(json);
      return(json);
    })
    
    // Icon 6
    temp.ticker="MSFT";
    fetch(`http://127.0.0.1:5000/v0/getHistory`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: new Headers({
        'Content-Type': 'application/json',
        })
    })
      fetch(`http://127.0.0.1:5000/v0/view?id=MSFT`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    }).then((response) => {
      return response.json();
    }).then((json)=>{
      setIcon6(json);
      return(json);
    })

    return() =>{
      //return null;
    };
  },[year, month, day]);


  const c1Options = {};
  c1Options.series = [];
  const c1GraphData = {'data': []}
  c1Options.series.push(c1GraphData);

  
  if (c1Data.length>0){
    let c1History= c1Data[0][0][1];

    for (let i=c1History.length-1; i>=0; i--){
      const temp = {};
        temp.x = new Date (c1History[i].day);
        temp.y = [];
        temp.y.push(c1History[i].open.toFixed(2));
        temp.y.push(c1History[i].high.toFixed(2));
        temp.y.push(c1History[i].low.toFixed(2));
        temp.y.push(c1History[i].close.toFixed(2));
        c1Options.series[0].data.push(temp);
    }
    c1Options.chart = {};
    c1Options.chart.type = 'candlestick';
    c1Options.chart.height = 350;
    c1Options.title = {};
    c1Options.title.text = 'TSLA';
    c1Options.title.align = 'left';
    c1Options.xaxis = {};
    c1Options.yaxis = {};
    c1Options.yaxis.tooltip = {};
    c1Options.yaxis.tooltip.enabled = true;

  }


  //RENDER WEBPAGE
  return (
    <div className="overflow-auto">
      
      <div className="box-border h-screen " 
        style={{backgroundImage: 'url(/homeImage.jpg)',
                    backgroundSize: "cover",
                    align: "center",
                    // opacity: "0.82",
                    height:1000
                    }}>
          <Navbar />
          <div className="grid w-1/2 text-6xl h-screen"style={{paddingLeft:"60px"}}>
            <div className="grid content-end text-yellow-300 font-serif font-mono font-bold">
              The price is what you pay, value is what you get.
              <p className="pt-3 content-end text-stone-400 text-3xl">
              Always an informed investment decision. First you prepare, then you go for it.
              </p>
            </div>
            
            <form className="nav-item" style={{paddingTop:'10px'}} action="Individual" >
              <input className="rounded-lg flex w-full focus:outline-none" placeholder=" TSLA, AAPL, NVDA..."
              type = "text" 
              name = "name"
              />
            </form>
          </div>

      </div>
      <div className="pt-4 px-4 text-6xl">
        Market Trends
        <div className="flex pt-4 grid grid-row-3 grid-col-6 gap-3 h-screen" id="chart">
          <div className=" text-lg row-span-3 col-span-4 row-start-1 min-w-full">
            <ReactApexChart className=" " options={c1Options} series={c1Options.series} type="candlestick" height={800} />
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-1 row-start-1">
            <img src={Meta} className="" height="65px" width="90px"  alt=""/>
            <div className="flex-1" >
              <p className="text-3xl">{icon1[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon1[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon1[0][0][1][0].close/icon1[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon1[0][0][1][0].close/icon1[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-1 row-start-1 text-2xl">
            <img src={Apple} className="" height="75px" width="75px" alt=""></img>
            <div className="pl-2 flex-1" >
              <p className="text-3xl">{icon2[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon2[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon2[0][0][1][0].close/icon2[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon2[0][0][1][0].close/icon2[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>    
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-1 row-start-2 text-2xl">
            <img src={Amazon} className="" height="80px" width="80px" alt=""></img>
            <div className="pl-2 flex-1" >
              <p className="text-3xl">{icon3[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon3[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon3[0][0][1][0].close/icon3[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon3[0][0][1][0].close/icon3[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-1 row-start-2text-2xl">
            <img src={Netflix} className="" height="80px" width="90px" alt=""></img>
            <div className="flex-1" >
              <p className="text-3xl">{icon4[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon4[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon4[0][0][1][0].close/icon4[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon4[0][0][1][0].close/icon4[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-1 row-start-3 text-2xl">
            <img src={Google} className="" height="70px" width="90px" alt=""></img>
            <div className="flex-1" >
              <p className="text-3xl">{icon5[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon5[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon5[0][0][1][0].close/icon5[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon5[0][0][1][0].close/icon5[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <div className="flex p-2 rounded-lg max-h-28 border-2 border-stone-200 px-2 row-start-3 text-2xl">
            <img src={Microsoft} className="" height="70px" width="70px" alt=""></img>
            <div className="pl-3 flex-1" >
              <p className="text-3xl">{icon6[0][0][0]}</p> 
              <div className="flex text-2xl">
                ${icon6[0][0][1][0].close.toFixed(2)}&emsp;
                <p className="" style={{color:((icon6[0][0][1][0].close/icon6[0][0][1][0].open)-1)>0?"green":"red"}}>{(100*((icon6[0][0][1][0].close/icon6[0][0][1][0].open)-1)).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>         

      <footer className="bg-[#27a5f8] h-48 px-12 pt-5" >
        <div className="flex bold text-4xl">About SlugFinance</div>
        <div className="flex text-2xl">
          We are a team of students studying computer science at University of California Santa Cruz.
          The goal of this project is to create an app that we can use to monitor stocks that we are 
          interested in. There is no money involved in this project.
        </div>

      </footer>
      
      
    </div>
  );
};
  
export default Home;

