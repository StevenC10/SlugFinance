# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring
import os
import json
import requests
import psycopg2
import sys
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, abort, jsonify, request
from bs4 import BeautifulSoup
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Route/Function to get the stock data of a specific ticker.
@app.route('/v0/ticker/', methods=['GET'])
def getStock():
    args = request.args
    tickerId = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker,price,change,percentChange FROM stockTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerId,))
    stock = cursor.fetchall()
    if stock:
        return jsonify(stock, 200)
    else:
        abort(404)

#Function to grab historical data about a stock
@app.route('/v0/view', methods=['GET'])
def viewStock():
    args = request.args
    tickerId = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker,stockData FROM historicalStockTable WHERE %s ILIKE ticker '
    cursor.execute(selectQuery, (tickerId, ))
    stock = cursor.fetchall()
    if stock:
        return jsonify(stock, 200)
    else:
        abort(404)

# Function to get connected to postgres database
def getConnection():
    conn = psycopg2.connect(
        host='localhost',
        database=os.environ.get('POSTGRES_DB'),
        port='5432',
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD')
    )
    return conn


#Function to scrape stock's about/description
def getAbout(symbol):
    selectQuery = 'SELECT ticker FROM stockDescriptionTable WHERE %s = ticker'
    insertQuery = 'INSERT INTO stockDescriptionTable(ticker, about) VALUES (%s, %s)'
    conn = getConnection()
    cursor = conn.cursor()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://google.com/search?q={symbol}'
    r = requests.get(url, headers = headers, timeout = 30)
    soup = BeautifulSoup(r.text, 'html.parser')
    data = soup.find_all('div', {'class': 'kno-rdesc'})
    for stock in data:
        description = stock.find_all('span')[0].text
        cursor.execute(selectQuery, (symbol,))
        found = cursor.fetchall()
        if not found:
            cursor.execute(insertQuery, (symbol, description,))
            conn.commit()
    cursor.close()
    conn.close()

@app.route('/v0/getDescription', methods = ['GET'])
def getDescription():
    args = request.args
    tickerDescription = args.get("description")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT * FROM stockDescriptionTable WHERE %s ILIKE ticker'
    cursor.execute(selectQuery, (tickerDescription, ))
    desc = cursor.fetchall()
    if desc:
        return jsonify(desc, 200)
    else:
        abort(400)



# Route/Function to check login of user
@app.route('/v0/login', methods=['POST'])
def submitLogin():
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    conn = getConnection()
    cursor = conn.cursor()
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security
    # how to do parameterized queries.
    selectQuery = 'SELECT personemail, personpassword FROM emailtable WHERE %s = personemail AND %s = personpassword'
    cursor.execute(selectQuery, (email, password,))
    account = cursor.fetchall()
    if account:
        queryEmail = account[0][0]
        queryPassword = account[0][1]
        if (email == queryEmail and password == queryPassword):
            return jsonify(account, 200)
    else:
        abort(404)


# Route/Function to create a new user account.
@app.route('/v0/create', methods=['POST'])
def createUser():
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    conn = getConnection()
    cursor = conn.cursor()
    insertQuery = 'INSERT INTO emailtable (personemail, personpassword) VALUES (%s, %s)'
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security how to do parameterized queries.
    cursor.execute(insertQuery, (email, password, ))
    conn.commit()
    selectQuery = 'SELECT personemail,personpassword FROM emailtable WHERE %s = personEmail'
    cursor.execute(selectQuery, (email, ))
    account = cursor.fetchall()
    cursor.close()
    conn.close()
    if account:
        return jsonify('account created'), 201
    else:
        abort(400)

# Route/Function to add stock to database.
@app.route('/v0/add', methods=['POST'])
def add():
    marketIndexFound = False
    marketIndexes = ['S&P 500', 'Dow 30', 'Nasdaq']
    args = request.json
    ticker = args.get('ticker', '')
    conn = getConnection()
    cursor = conn.cursor()
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
        selectQuery = 'SELECT ticker FROM stockTable WHERE %s ILIKE ticker'
        updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
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
            getAbout(symbol)
        return jsonify('Stocks added!'), 201
    else:
        url = f'https://finance.yahoo.com/quote/{ticker}'
        r = requests.get(url, headers=headers, timeout=30)
        soup = BeautifulSoup(r.text, 'html.parser')
        stock = {
            'symbol': ticker,
            'price': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text,
            'change': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[1].text,
            'dailyChange': soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[2].text
        }
        stockPrice = stock['price']
        stockSymbol = ticker
        stockChange = stock['change']
        stockPercentChange = stock['dailyChange']
        selectQuery = 'SELECT ticker,price,change,percentChange FROM stockTable WHERE %s = ticker'
        cursor.execute(selectQuery, (stockSymbol,))
        stock = cursor.fetchall()
        if len(stock) > 0:
            updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
            cursor.execute(updateQuery, (stockPrice, stockChange,
                           stockPercentChange, stockSymbol,))
            conn.commit()
        else:
            insertQuery = 'INSERT INTO stockTable (ticker, price, change, percentChange) VALUES (%s, %s, %s, %s)'
            cursor.execute(insertQuery, (stockSymbol, stockPrice,
                           stockChange, stockPercentChange,))
            conn.commit()
        getAbout(stockSymbol)
        return jsonify('Stock Added!'), 201

#Gets the historical data for specified stock
@app.route('/v0/getHistory', methods=['POST'])
def getHistoricalData():
    args = request.json
    tickerId = args.get('ticker', '')
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker FROM historicalStockTable WHERE %s ILIKE ticker '
    cursor.execute(selectQuery, (tickerId, ))
    account = cursor.fetchall()
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://finance.yahoo.com/quote/{tickerId}/history?p={tickerId}'
    r = requests.get(url, headers=headers, timeout=30)
    soup = BeautifulSoup(r.text, 'html.parser')
    stockArr = []
    stockData = soup.find_all('table')
    for table in stockData:
        trs = table.find_all('tr')
        for tr in trs:
            tds = tr.find_all('td')
            if len(tds) > 6:
                data = {
                    'day': tds[0].get_text(),
                    'open': tds[1].get_text(),
                    'high': tds[2].get_text(),
                    'low': tds[3].get_text(),
                    'close': tds[4].get_text()
                }
                stockArr.append(data)
    res = json.dumps(stockArr)
    if (account):
        updateQuery = 'UPDATE historicalStockTable SET stockData = %s WHERE %s ILIKE ticker'
        cursor.execute(updateQuery, (res, tickerId,))
        conn.commit()
    else:
        insertQuery = 'INSERT INTO historicalStockTable(ticker, stockData) VALUES (%s, %s)'
        cursor.execute(insertQuery, (tickerId, res, ))
        conn.commit()
    return jsonify('success', 201)


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
