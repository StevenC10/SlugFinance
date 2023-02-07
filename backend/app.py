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


# @app.route('/profile')
# def my_profile() :
#     response_body = {
#         'name' : 'Steven'
#     }
#     return stockArr

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

def getConnection():
    conn = psycopg2.connect(
        host = 'localhost',
        database = os.environ.get('POSTGRES_DB'),
        port = '5432',
        user = os.environ.get('POSTGRES_USER'),
        password = os.environ.get('POSTGRES_PASSWORD')
    )
    return conn

@app.route('/v0/login', methods = ['POST'])
def submitLogin():
    args = request.json
    email = args.get('email', '')
    password = args.get('password', '')
    conn = getConnection()
    cursor = conn.cursor()
    # https://stackoverflow.com/questions/45128902/psycopg2-and-sql-injection-security how to do parameterized queries.
    # selectQuery = 'SELECT * FROM emailtable'
    selectQuery = 'SELECT personemail, personpassword FROM emailtable WHERE %s = personemail AND %s = personpassword'
    cursor.execute(selectQuery, (email, password,))
    account = cursor.fetchall()
    if account:
        queryEmail = account[0][0]
        queryPassword = account[0][1]
        if(email == queryEmail and password == queryPassword and account):
            return jsonify(account, 200)
    else:
        abort(404)

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


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint (
    SWAGGER_URL,
    API_URL,
    config = {
        'app_name' : "SlugFinance API"
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)