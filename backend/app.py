<<<<<<< Updated upstream
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, abort, jsonify, request, after_this_request
import json
import requests
import json
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/profile')
def my_profile() :
    response_body = {
        'name' : 'Steven'
    }
    return stockArr
@app.route('/v0/ticker', methods = ['GET'])
def getStock():
    args = request.args
    id = args.get("id")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://finance.yahoo.com/quote/{id}'
    r = requests.get(url, headers = headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text
    stock = {
        'symbol' : id,
        'price' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text,
        'change' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[1].text,
        'dailyChange' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[2].text
    }
    return jsonify(stock,200)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint (
    SWAGGER_URL,
    API_URL,
    config = {
        'app_name' : "SlugFinance API"
    }
)
=======
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, abort, jsonify, request, after_this_request
import json
import requests
import json
from bs4 import BeautifulSoup
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
import sys

app = Flask(__name__)
CORS(app)


#Route/Function to get the stock data of a specific ticker.
@app.route('/v0/ticker/', methods = ['GET'])
def getStock():
    args = request.args
    id = args.get("id")
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT ticker,price,change,percentChange FROM stockTable WHERE %s = ticker'
    cursor.execute(selectQuery, (id,))
    stock = cursor.fetchall()
    if  stock:
        return jsonify(stock,200)
    else:
        abort(404)


@app.route('/v0/view', methods = ['GET'])
def viewStock():
    conn = getConnection()
    cursor = conn.cursor()
    selectQuery = 'SELECT * FROM stockTable'
    cursor.execute(selectQuery)
    stock = cursor.fetchall()
    if stock:
        return jsonify(stock,200)
    else:
        abort(404)

#Function to get connected to postgres database
def getConnection():
    conn = psycopg2.connect(
        host = 'localhost',
        database = os.environ.get('POSTGRES_DB'),
        port = '5432',
        user = os.environ.get('POSTGRES_USER'),
        password = os.environ.get('POSTGRES_PASSWORD')
    )
    return conn


#Route/Function to check login of user
@app.route('/v0/login', methods = ['POST'])
def submitLogin():
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    conn = getConnection()
    cursor = conn.cursor()
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security how to do parameterized queries.
    selectQuery = 'SELECT personemail, personpassword FROM emailtable WHERE %s = personemail AND %s = personpassword'
    cursor.execute(selectQuery, (email, password,))
    account = cursor.fetchall()
    if account:
        queryEmail = account[0][0]
        queryPassword = account[0][1]
        if(email == queryEmail and password == queryPassword):
            return jsonify(account, 200)
    else:
        abort(404)


#Route/Function to create a new user account.
@app.route('/v0/create', methods = ['POST'])
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
    if(account):
        return 'Account Created', 201
    else:
        abort(400)

#Route/Function to add stock to database.
@app.route('/v0/add', methods = ['POST'])
def add():
    args = request.json
    ticker = args.get('ticker', '')
    conn = getConnection()
    cursor = conn.cursor()
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    url = f'https://finance.yahoo.com/quote/{ticker}'
    r = requests.get(url, headers = headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text
    stock = {
        'symbol' : ticker,
        'price' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[0].text,
        'change' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[1].text,
        'dailyChange' : soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('fin-streamer')[2].text
    }
    stockPrice = stock['price']
    stockSymbol = ticker
    stockChange = stock['change']
    stockPercentChange = stock['dailyChange']
    selectQuery = 'SELECT ticker,price,change,percentChange FROM stockTable WHERE %s = ticker'
    cursor.execute(selectQuery, (stockSymbol,))
    stock = cursor.fetchall()
    if(len(stock) >  0):
        updateQuery = 'UPDATE stockTable SET price = %s, change = %s, percentChange = %s WHERE ticker = %s'
        cursor.execute(updateQuery, (stockPrice, stockChange, stockPercentChange, stockSymbol,))
        conn.commit()
    else:
        insertQuery = 'INSERT INTO stockTable (ticker, price, change, percentChange) VALUES (%s, %s, %s, %s)'
        cursor.execute(insertQuery, (stockSymbol, stockPrice, stockChange, stockPercentChange,))
        conn.commit()
    return 'Stock Added!', 201

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint (
    SWAGGER_URL,
    API_URL,
    config = {
        'app_name' : "SlugFinance API"
    }
)
>>>>>>> Stashed changes
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)