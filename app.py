from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, abort, jsonify
import json

app = Flask(__name__)

with open("stockdata.json", "r") as f:
    arr = json.load(f)
@app.route('/profile')
def my_profile() :
    response_body = {
        'name' : 'Steven'
    }
    return stockArr
@app.route('/v0/ticker/<id>')
def getStock(id):
    found = False
    for element in arr:
        for value in element.values():
            if value == id.upper():
                found = True
                foundObj = element
    if found == True:
        return jsonify(foundObj,200)
    else:
        abort(404)


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