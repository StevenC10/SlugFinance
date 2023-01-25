from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask


app = Flask(__name__)

@app.route('/profile')
def my_profile() :
    response_body = {
        'name' : 'Steven'
    }
    return response_body

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint (
    SWAGGER_URL,
    API_URL,
    config = {
        'app_name' : "SlugFinance API"
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)