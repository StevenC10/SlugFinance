import React from "react";
// import {useNavigate} from 'react-router-dom';
import Logo from "../images/test2.png"

function toLogin() {
  window.location.replace("http://localhost:3000/login");
}

function toSignup() {
  window.location.replace("http://localhost:3000/signup");
}

function toPortfolio() {
  window.location.replace("http://localhost:3000/portfolio")
}

function removeFromPortfolio(toRemove) {
  console.log(toRemove);
  const item = localStorage.getItem('user');
  console.log(item);
  const removing = {useremail: item, ticker: toRemove};
    fetch('http://127.0.0.1:5000/v0/deleteFromPortfolio', {
      method: 'DELETE',
      body: JSON.stringify(removing),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
}

const fetchPortfolio = (setPortfolio) => {
  
  console.log('yerr');
  const item = localStorage.getItem('user');
  const info = [];

  const result = fetch('http://127.0.0.1:5000/v0/getFromPortfolio?email=' + item, {
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
    .catch((error) => {
      // console.log(error);
      setPortfolio([]);
    });

    result.then(tickers => {
      console.log(tickers);
      if (tickers) {
        for (const ticker of tickers) {
          // console.log(ticker);
          const getInfo = {ticker: ticker};
          const adding = fetch('http://127.0.0.1:5000/v0/add', {
            method: 'POST',
            body: JSON.stringify(getInfo),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw response;
              }
              return response.json();
            })
            .catch((error) => {
              console.log(error);
            });
  
          adding.then(add => {
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
                info.push(json);
                console.log(tickers[0]);
                console.log(info.length);
                if(info.length === tickers.length) {
                  console.log(info);
                  let sorted = info.sort(function(a, b) {
                    return b[0][0][2] - a[0][0][2];
                  });
                  console.log(sorted);
                  setPortfolio(sorted);
                }
              })
              .catch((error) => {
                console.log(error);
              });
            })
          }
      } else {
        alert('No stocks in watchlist!');
      }
    });
};

const Portfolio = () => {

	// const history = useNavigate();

	// const redirect = (event) => {
	// 	history('/individual');
	// };

  // console.log(localStorage.user);

  const [portfolio, setPortfolio] = React.useState([]);
  // const [view, setView] = React.useState([]);

  React.useEffect(() => {
    fetchPortfolio(setPortfolio);
    // fetchInfo(portfolio, setView)
  },[]);

  const rows = [];
  if(portfolio.length !== 0) {
    // console.log(portfolio);
    for (let i = 0; i < portfolio.length; i++) {
      const column = [];
      console.log(portfolio[i][0][0][0]);
      column.push(<th className="flex gap-3 px-6 py-4 font-normal text-gray-900"><div className="text-sm"><div className="font-medium text-gray-700">{portfolio[i][0][0][0].toUpperCase()}</div><div className="text-gray-400">{portfolio[i][0][0][1]}</div></div></th>);
      column.push(<td className="px-6 py-4 font-medium">{portfolio[i][0][0][3]}</td>);
      column.push(<td className="px-6 py-4 font-medium">{portfolio[i][0][0][4]}</td>);
      column.push(<td className="px-6 py-4 font-medium">{portfolio[i][0][0][2]}</td>);
      column.push(<td className="px-6 py-4">
      <div className="flex justify-end gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            x-tooltip="tooltip"
            onClick={() => removeFromPortfolio(portfolio[i][0][0][0].toUpperCase())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
      </div>
    </td>)
      rows.push(<tr className="hover:bg-gray-50">{column}</tr>)
    }
  }



  console.log(rows);
  return (
	<div>
    <header className="top-0 sm:px-12 mx-auto flex items-center p-4 bg-blue-900">
        <div className="container flex justify-between h-10 mx-auto">
          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 mx-0">
            <img src={Logo} className="w-12 h-12" alt="logo" />
            <div className="text-xl flex flex-col font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-200">
              SLUG FINANCE 
            </div>
          </a>
          <div className="mb-6 items-center justify-start">
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
	<h2 className="m-4 text-2xl font-semibold leading-tight">Watchlist</h2>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  	<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-100">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ticker</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Change (Daily)</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Change % (Daily)</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Last Price</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      {rows}
    </tbody>
  </table>
</div>
</div>
  )
};
  
export default Portfolio;
