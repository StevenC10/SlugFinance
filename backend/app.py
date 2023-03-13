# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring
import os
import json
import requests
import psycopg2
import time
import datetime
import sys
import pandas as pd
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, abort, jsonify, request
from bs4 import BeautifulSoup
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from selenium import webdriver
import seleniumScraper as ss
import stockDataToExcel as sdte
from selenium.webdriver.firefox.options import Options 

@app.route('/v0/yahooAdd', methods=['POST'])
def yahooAdd():
    with open('pairs.json', 'r') as ct_file:
        ct_data = json.load(ct_file)
    conn = getConnection()
    cursor = conn.cursor()
    options = Options() 
    options.add_argument("-headless") 
    with webdriver.Firefox(options=options) as browser: 
        args = request.json
        user = args.get('email', '')
        user = user + "@yahoo.com" 
        pswd = args.get('password', '')
        portfolio = args.get('portfolio', '')
        ss.launchAndLogin(browser, user, pswd)
        todayData = ss.getPortfolioData(browser, portfolio)
        sdte.jsonListToExcel(todayData)
        selectQuery = 'SELECT ticker,company, price,change,percentChange FROM stockTable WHERE %s = ticker'
        for i in todayData:
            stockSymbol = i['symbol'] 
            stockPrice = i['price']
            stockChange = i['change']
            stockPercentChange = i['percentChange']
            stockCompany = ct_data[stockSymbol]
            cursor.execute(selectQuery, (stockSymbol,))
            stock = cursor.fetchall()
            if len(stock) > 0:
                updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
                cursor.execute(updateQuery, (stockPrice, stockChange,
                               stockPercentChange, stockSymbol,))
                conn.commit()
            else:
                insertQuery = 'INSERT INTO stockTable (ticker, company, price, change, percentChange) VALUES (%s,%s, %s, %s, %s)'
                cursor.execute(insertQuery, (stockSymbol,stockCompany,stockPrice,
                               stockChange, stockPercentChange,))
                conn.commit()
            getAbout(stockSymbol)
        browser.quit()
    return jsonify('Stocks Added!'), 201

def storeData(table1, table2):
    """
    This function gets two tables of stock information and stores it into a dictionary.
    
    Function accesses the two tables and stores the data into a dictionary which gets
    appended to an array. The array is then turned into JSON to be easily readable
    and parsable. Used in getInfo(), and is abstracted.
    """
    stockInformation = {
        'Previous Close' : None,
        'Open' : None,
        'Bid': None,
        'Ask' : None,
        'Day\'s Range': None,
        '52 Week Range': None,
        'Volume': None,
        'Avg. Volume': None,
        'Market Cap': None,
        'Beta(5Y Monthly)': None,
        'PE Ratio (TTM)': None,
        'EPS(TTM)': None,
        'Earnings Date': None,
        'Ex-Dividend Date': None,
        '1y Target EST': None
    }
    stockInformation['Previous Close'] = table1[0].get_text()
    stockInformation['Open'] = table1[1].get_text()
    stockInformation['Bid'] = table1[2].get_text()
    stockInformation['Ask'] = table1[3].get_text()
    stockInformation['Day\'s Range'] = table1[4].get_text()
    stockInformation['52 Week Range'] = table1[5].get_text()
    stockInformation['Volume'] = table1[6].get_text()
    stockInformation['Avg. Volume'] = table1[7].get_text()
    stockInformation['Market Cap'] = table2[0].get_text()
    stockInformation['Beta(5Y Monthly)'] = table2[1].get_text()
    stockInformation['PE Ratio (TTM)'] = table2[2].get_text()
    stockInformation['EPS(TTM)'] = table2[3].get_text()
    stockInformation['Earnings Date'] = table2[4].get_text()
    stockInformation['Forward Dividend & Yield'] = table2[5].get_text()
    stockInformation['Ex-Dividend Date'] = table2[6].get_text()
    stockInformation['1y Target EST'] = table2[7].get_text()
    stockArr = []
    stockArr.append(stockInformation)
    return json.dumps(stockArr)

@app.route('/v0/ticker/', methods=['GET'])
def getStock():
    """ This function requests and id and returns a stock's performance for the day and full name.
    
    Function will check postgres database to see if ticker is found, if not then it will return 404
    error not found. You can test this through 127.0.0.1:5000/v0/ticker/{specifiedTicker} or by fetching
    on the frontend.
    
    Example: 127.0.0.1:5000/v0/ticker/TSLA
    """
    args = request.args
    tickerId = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker,company, price,change,percentChange FROM stockTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerId,))
    stock = cursor.fetchall()
    cursor.close()
    conn.close()
    if stock:
        return jsonify(stock, 200)
    else:
        abort(404)

@app.route('/v0/retrieveInfo/', methods=['GET'])
def retrieveInfo():
    """ This function request an id and returns a stock's information such as 52 week high, dividend yield.
    
    Function will check postgres database to see if requested ticker is in the database, if not then
    the function will return a 404 error, stating that it's not found.
    You can test this through 127.0.0.1:5000/v0/retriveInfo/{specifiedTicker} or by fetching
    on the frontend.
    
    Example: 127.0.0.1:5000/v0/retrieveInfo/TSLA
    """
    args = request.args
    tickerId = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker, infoData FROM stockInfoTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerId,))
    stock = cursor.fetchall()
    cursor.close()
    conn.close()
    if stock:
        return jsonify(stock, 200)
    else:
        abort(404)


@app.route('/v0/view', methods=['GET'])
def viewStock():
    """This function will request an id and return's the stock's historical data
    
    Function will check postgres database if requested ticker is in the database.
    If it is not in the database, then the function will return a 404 not found error.
    You can test this through 127.0.0.1:5000/v0/view/{specifiedTicker}, or through
    the frontend.
    
    Example: 127.0.0.1:5000/v0/view/GOOGL 
    
    """
    args = request.args
    tickerId = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker,stockData FROM historicalStockTable WHERE %s ILIKE ticker '
    cursor.execute(selectQuery, (tickerId, ))
    stock = cursor.fetchall()
    cursor.close()
    conn.close()
    if stock:
        return jsonify(stock, 200)
    else:
        abort(404)

def getConnection():
    """ This function connects flask to database to store data for fast lookup
    
    Function will connect to database to handle connections to store data,
    return data, etc. This can be used in every function to setup a connection,
    and a cursor to insert,update,delete,etc sql query statements.
    
    """
    conn = psycopg2.connect(
        host='localhost',
        database=os.environ.get('POSTGRES_DB'),
        port='5432',
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD')
    )
    return conn



def getAbout(symbol):
    """ This function will use BeautifulSoup to scrape yahoo finance and insert/update data into postgres.
    
    Function will scrape yahoo finance for it's description of company 
    requested by the user and store into postgres database. It will
    check if its in the database, if it's in the database then it will
    update it. If it isn't then it will insert it into the database.
    
    """
    selectQuery = 'SELECT ticker FROM stockDescriptionTable WHERE %s = ticker'
    insertQuery = 'INSERT INTO stockDescriptionTable(ticker, about) VALUES (%s, %s)'
    updateQuery = 'UPDATE stockDescriptionTable SET about = %s WHERE ticker = %s'
    conn = getConnection()
    cursor = conn.cursor()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://finance.yahoo.com/quote/{symbol}/profile'
    r = requests.get(url, headers = headers, timeout = 30)
    soup = BeautifulSoup(r.text, 'html.parser')
    data = soup.find('section', {'class': 'quote-sub-section Mt(30px)'}).find_all('p')
    description = data[0].get_text()
    cursor.execute(selectQuery, (symbol,))
    found = cursor.fetchall()
    if found:
        cursor.execute(updateQuery, (description, symbol,))
        conn.commit()
    else:
        cursor.execute(insertQuery, (symbol, description,))
        conn.commit()
    cursor.close()
    conn.close()


@app.route('/v0/getDescription', methods = ['GET'])
def getDescription():
    """This function will do a lookup into the database to see if user specified ticker exists.
    
    Function will do a select query statement to check postgres database if specified ticker exists.
    If not, then the function will return a 404 error.
    
    
    Example: 127.0.0.1:5000/v0/getDescription/SPY will return the description of SPY.
    
    """
    args = request.args
    tickerDescription = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT * FROM stockDescriptionTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerDescription, ))
    desc = cursor.fetchall()
    cursor.close()
    conn.close()
    if desc:
        return jsonify(desc, 200)
    else:
        abort(400)



@app.route('/v0/login', methods=['POST'])
def submitLogin():
    """ This function will check if the username/password combo exists in the database
    
    Function will query postgres database if username/password combo exists in database.
    If the combo exists, then the function will return a 200 OK. If not, then
    the function will return a 404 error not found.
    
    """
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    email = email.replace('@', '%40')
    conn = getConnection()
    cursor = conn.cursor()
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security
    # how to do parameterized queries.
    selectQuery = 'SELECT personemail, personpassword FROM emailtable WHERE %s = personemail AND %s = personpassword'
    cursor.execute(selectQuery, (email, password,))
    account = cursor.fetchall()
    cursor.close()
    conn.close()
    if account:
        queryEmail = account[0][0]
        queryPassword = account[0][1]
        if (email == queryEmail and password == queryPassword):
            return jsonify('200 OK')
    else:
        abort(404)

@app.route('/v0/create', methods=['POST'])
def createUser():
    """ This function will create a new username/password combo and insert it into the postgres table.
    
    This function will check if the username/password combo exists in the database already, if
    the combo exists then the function will return a 400 Bad Request. If it isn't then 
    it will insert it into the database.
    """
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    email = email.replace('@', '%40')
    conn = getConnection()
    cursor = conn.cursor()
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security how to do parameterized queries.
    selectQuery = 'SELECT personemail,personpassword FROM emailtable WHERE %s = personEmail'
    cursor.execute(selectQuery, (email, ))
    account = cursor.fetchall()
    if len(account) == 0:
        insertQuery = 'INSERT INTO emailtable (personemail, personpassword) VALUES (%s, %s)'
        cursor.execute(insertQuery, (email, password, ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify('account created'), 201
    else:
        cursor.close()
        conn.close()
        return jsonify("account already exists"), 400


@app.route('/v0/add', methods=['POST'])
def add():
    """ Function will add performance about specified stock, and its full name.
    
    This function scrapes yahoo finance to get information such as its price,how much it gain/loss 
    in the day, the gain/loss in percent difference from it's performance day prior, and will
    get it's full name of its company. TSLA = (Tesla Inc.)
    
    """
    marketIndexFound = False
    marketIndexes = ['S&P 500', 'Dow 30', 'Nasdaq']
    args = request.json
    ticker = args.get('ticker', '')
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker FROM stockTable WHERE %s ILIKE ticker'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    for index in marketIndexes:
        if index == ticker:
            marketIndexFound = True
    if marketIndexFound:
        url = 'https://finance.yahoo.com'
        r = requests.get(url, headers=headers, timeout=30)
        soup = BeautifulSoup(r.text, 'html.parser')
        data = soup.find_all('h3', {'class': 'Maw(160px)'})
        insertQuery = 'INSERT INTO stockTable (ticker, price, change, percentChange) VALUES (%s, %s, %s, %s)'
        updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
        selectQuery = 'SELECT ticker FROM stockTable WHERE %s ILIKE ticker'
        for x in data:
            symbol = x.find_all('a')[0].text
            price = x.find_all('fin-streamer')[0].text
            price = price.replace(',', '')
            change = x.find_all('span')[0].text
            percentChange = x.find_all('span')[1].text
            cursor.execute(selectQuery, (symbol, ))
            stock = cursor.fetchall()
            if (len(stock) > 0):
                cursor.execute(
                    updateQuery, (price, change, percentChange, symbol,))
                conn.commit()
            else:
                cursor.execute(
                    insertQuery, (symbol, price, change, percentChange,))
                conn.commit()
            # getAbout(symbol)
        return jsonify('Market Indexes added!'), 201
    else:
        url = f'https://finance.yahoo.com/quote/{ticker}'
        r = requests.get(url, headers=headers, timeout=30)
        soup = BeautifulSoup(r.text, 'html.parser')
        stock = {
            'company': soup.find('h1', {'class' : 'D(ib) Fz(18px)'}).get_text(),
            'symbol': ticker,
            'price': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text,
            'change': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[1].text,
            'dailyChange': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[2].text
        }
        stockCompany = stock['company']
        stockPrice = stock['price']
        stockSymbol = ticker
        stockChange = stock['change']
        stockPercentChange = stock['dailyChange']
        cursor.execute(selectQuery, (stockSymbol, ))
        stock = cursor.fetchall()
        if len(stock) > 0:
            updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
            cursor.execute(updateQuery, (stockPrice, stockChange,
                           stockPercentChange, stockSymbol,))
            conn.commit()
        else:
            insertQuery = 'INSERT INTO stockTable (ticker, company, price, change, percentChange) VALUES (%s,%s, %s, %s, %s)'
            cursor.execute(insertQuery, (stockSymbol,stockCompany,stockPrice,
                           stockChange, stockPercentChange,))
            conn.commit()
        getAbout(stockSymbol)
        cursor.close()
        conn.close()
        return jsonify('Stock Added!'), 201

@app.route('/v0/getInfo', methods = ['POST'])
def getInfo():
    """ This function scrapes yahoo finance to get information such as 52 week high/low and will add into the database.
    
    This function will check if the data exists already in the database before inserting it.
    If it exists then it will update the data.
    
    """
    args = request.json
    tickerId = args.get('ticker')
    conn = getConnection()
    cursor = conn.cursor()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://finance.yahoo.com/quote/{tickerId}'
    r = requests.get(url, headers = headers, timeout = 30)
    soup = BeautifulSoup(r.text, 'html.parser')
    data = soup.find_all('table')
    for information in data[0]:
        firstTable = information.find_all('td', {'class': 'Ta(end) Fw(600) Lh(14px)'})
    for information in data[1]:
        secondTable = information.find_all('td', {'class': 'Ta(end) Fw(600) Lh(14px)'})
    stockData = storeData(firstTable, secondTable)
    selectQuery = 'SELECT * FROM stockInfoTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerId,))
    found = cursor.fetchall()
    if found:
        updateQuery = 'UPDATE stockInfoTable SET infoData = %s WHERE ticker = %s'
        cursor.execute(updateQuery, (stockData, tickerId, ))
        conn.commit()
        return jsonify('Data Updated', 201)
    insertQuery = 'INSERT INTO stockInfoTable(ticker, infoData) VALUES (%s, %s)'
    cursor.execute(insertQuery, (tickerId, stockData,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify('Data Added', 201)


@app.route('/v0/getHistory', methods=['POST'])
def getHistoricalData():
    """ This function will scrape yahoo finance to get historical data.
    
    Function will get the interval that user specified, and download the data to a csv.
    The CSV is then converted into JSON, to show the user on the individual page in the 
    frontend.
    """
    stockArr = []
    args = request.json
    tickerId = args.get('ticker', '')
    year = args.get('year', '')
    year2 = args.get('year2', '')
    month = args.get('month', '')
    month2= args.get('month2', '')
    day = args.get('day', '')
    day2 = args.get('day2', '')
    interval = args.get('interval', '')
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker FROM historicalStockTable WHERE %s ILIKE ticker '
    cursor.execute(selectQuery, (tickerId, ))
    account = cursor.fetchall()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    # url = f'https://finance.yahoo.com/quote/{tickerId}/history?p={tickerId}'
    # Citing Jie Jenn on how to change intervals for historical data https://youtu.be/NjEc7PB0TxQ
    period1 = int(time.mktime(datetime.datetime(year,month,day).timetuple()))
    period2 = int(time.mktime(datetime.datetime(year2, month2, day2).timetuple()))
    # url = f'https://finance.yahoo.com/quote/{tickerId}/history?period1={period1}&period2={period2}&interval={interval}&filter=history&frequency=7d&includeAdjustedClose=true'
    url = f'https://query1.finance.yahoo.com/v7/finance/download/{tickerId}?period1={period1}&period2={period2}&interval={interval}&events=history&includeAdjustedClose=true'

    dataFromUrl = pd.read_csv(url, header = 0, usecols = ["Date", "Open", "High", "Low", "Close"])
    dataFromUrlReverse = dataFromUrl.iloc[::-1]
    for i, row in dataFromUrlReverse.iterrows():
        stock = {
            'day' : row[0],
            'open': row[1],
            'high': row[2],
            'low': row[3],
            'close': row[4]
        }
        stockArr.append(stock)
    # stockArr.sort(key = lambda x: datetime.datetime.strptime(x['day'], '%Y-%m-%d'))
    res = json.dumps(stockArr)
    if (account):
        updateQuery = 'UPDATE historicalStockTable SET stockData = %s WHERE %s ILIKE ticker'
        cursor.execute(updateQuery, (res, tickerId,))
        conn.commit()
    else:
        insertQuery = 'INSERT INTO historicalStockTable(ticker, stockData) VALUES (%s, %s)'
        cursor.execute(insertQuery, (tickerId, res, ))
        conn.commit()
    cursor.close()
    conn.close()
    return jsonify('success', 201)


@app.route('/v0/addPortfolio', methods = ['POST'])
def addPortfolio():
    """ This function will add specified ticker into postgres database based on user that is logged in."""
    args = request.json
    email = args.get('useremail', '')
    ticker = args.get('ticker', '')
    asciiemail = email.replace('@', '%40')
    conn = getConnection()
    cursor = conn.cursor()
    insertQuery = 'INSERT INTO userPortfolioTable(personemail,ticker) VALUES (%s, %s)'
    cursor.execute(insertQuery, (asciiemail, ticker,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify("Added to Portfolio", 200)



@app.route('/v0/deleteFromPortfolio', methods = ['DELETE'])
def deletePortfolio():
    """ This function will delete a specified ticker from postgres database based on user logon.
    
    This can be used when a user no longer wants to have stock in their watchlist.
     
    """
    args = request.json
    email = args.get('useremail', '')
    ticker = args.get('ticker', '')
    asciiemail = email.replace('@', '%40')
    conn = getConnection()
    cursor = conn.cursor()
    deleteQuery = 'DELETE FROM userPortfolioTable WHERE %s = ticker AND %s = personemail'
    cursor.execute(deleteQuery, (ticker, asciiemail,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify('deleted from portfolio'),200

@app.route('/v0/getFromPortfolio', methods = ['GET'])
def getPortfolio():
    """This function will return all stock tickers that belong to a specific email.
    
    Example: lance@ucsc.edu, TSLA, AMD, SPY, VOOG, AMC, GME
             steven@ucsc.edu, BBB, RBLX, COST
    """
    args = request. args
    email = args.get('email')
    conn = getConnection()
    cursor = conn.cursor()
    email = email.replace('@', '%40')
    updateQuery = "UPDATE userPortfolioTable SET personemail = REPLACE(personemail, '@', '%40')"
    cursor.execute(updateQuery)
    conn.commit()
    selectQuery = 'SELECT DISTINCT ticker FROM userPortfolioTable WHERE %s = personemail'
    # selectQuery = 'SELECT * FROM userPortfolioTable'
    cursor.execute(selectQuery, (email,))
    ticker = cursor.fetchall()
    cursor.close()
    conn.close()
    if len(ticker) > 0:
        return jsonify(ticker),200
    return jsonify('No email found'),404

#Used to configure swagger and add routes for frontend to grab data from backend
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "SlugFinance API"
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)