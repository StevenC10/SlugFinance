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
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)v