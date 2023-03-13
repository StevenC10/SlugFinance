# SlugFinance
## Install docker : https://docs.docker.com/get-docker/
After installing docker open a terminal:
```
$ cd backend
$ docker compose up -d (to start up a instance of postgres)
$ docker compose down (if you want to update, or  if anything goes wrong)
```

## Python Virtual Environment Setup

Inside the backend directory:
```
$ python3 -m venv venv
```
For Windows:
```
$ source venv/scripts/activate
```
For Mac:
```
$ source venv/bin/activate
```
To install dependencies:
```
$ python3 -m pip install -r requirements.txt
```
To stop the venv:
```
$ deactivate
```

## Additional setup for Selenium:
```
curl -LJO https://github.com/mozilla/geckodriver/releases/tag/v0.32.2/<whichever web driver fits your system>
```
Then, move the driver executable into a directory in your $PATH
## Notes for frontend:
#### make sure to install node.js and npm onto your machine

npm install react-apexcharts --save

npm install -D tailwindcss

npm install react-icons --save


## To Use App:

open a terminal:
```
$ cd backend
$ python3 -m flask run
```

open a second terminal:
```
$ cd frontend
$ cd react
$ npm start
```
