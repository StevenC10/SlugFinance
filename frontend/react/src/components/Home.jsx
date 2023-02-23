// import '../App.css';
import React, {useState,useEffect} from 'react';
import {FaSistrix, FaBars} from "react-icons/fa"
import Logo from '../images/test2.png'
// import {useNavigate} from 'react-router-dom';

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
  return (
    <div>
      <nav className="relative flex items-center justify-between px-2 py-3 bg-[#27a5f8] sticky top-0">
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
                  href="#pablo"
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
      
      <div class="flex box-border font-mono font-bold text-6xl items-center text-center h-screen "
        style={{backgroundImage: 'url(https://knowledge.wharton.upenn.edu/wp-content/uploads/2020/11/Stock-Market-900x387.jpg)',
                    backgroundRepeat: "no=repeat",
                    backgroundSize: "cover",
                    align: "center"
                    }}>
        
        <div class="flex-grow ">
          Such an inspirational quote
        </div>
        
      </div>
      
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
};
  
export default Home;