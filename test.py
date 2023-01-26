import requests
import json
from bs4 import BeautifulSoup



#initial stock scraping 
patrickFavStock = ['SPY', 'VOOG', 'AMD', 'GNS', 'GME']
patrickStockData = []


#eventually will be able to call this when ever someone add's a ticker to their portfolio
def getStockData(symbol):
   headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
   url = f'https://finance.yahoo.com/quote/{symbol}'

   r = requests.get(url, headers = headers)
   soup = BeautifulSoup(r.text, 'html.parser')
   stock = {
      'symbol' : symbol,
      'price' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text,
      'change' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[1].text,
      'dailyChange' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[2].text
   }
   return stock

for stock in patrickFavStock:
   patrickStockData.append(getStockData(stock))

with open('stockdata.json', 'w') as f:
   json.dump(patrickStockData, f)