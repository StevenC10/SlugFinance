#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 10 17:35:25 2023

@author: ben
"""

import pytest
import json
import os
from app import app

@pytest.fixture(scope="session", autouse=True)
def set_env():
    os.environ["POSTGRES_DB"] = "dev"
    os.environ["POSTGRES_USER"] = "postgres"
    os.environ["POSTGRES_PASSWORD"] = "postgres"


def test_getStock():
    """  Test to check for valid ticker
    """
    response = app.test_client().get('/v0/ticker/', query_string={"id": "UCSC"})
    res = json.loads(response.data.decode('utf-8'))
    assert type(res[0][0]) == list
    assert response.status_code == 200

def test_invalidStock():
    """Test to check for invalid ticker
    """
    response = app.test_client().get('/v0/ticker/', query_string = {"id": "F"})
    assert response.status_code == 404


def test_retrieveInfo():
    """ Test to check info is retrievable"""
    response = app.test_client().post('/v0/getInfo', json = {
        "ticker" : "TSLA",
    })
    if(response.status_code == 201):
        assert "Data Updated".encode() in response.data
    else:
        assert response.status_code == 200
    response = app.test_client().get('/v0/retrieveInfo/', query_string = {"id": "TSLA"})
    assert response.status_code == 200

def test_invalidRetrieveInfo():
    """ Test to check retrieveInfo is false"""
    response = app.test_client().get('/v0/retrieveInfo/', query_string = {"id": "GME"})
    assert response.status_code == 404

def test_getInfo():
    """ Test to check getInfo is working"""
    response = app.test_client().post('/v0/getInfo', json = {
        "ticker" : "TWTR",
    })
    assert "201".encode() in response.data

def test_view():
    response = app.test_client().post('/v0/getHistory', json = {
        "ticker" : "INTC",
        "year" : 2022,
        "month" : 1,
        "day" : 1,
        "year2": 2022,
        "month2": 2,
        "day2": 1,
        "interval" : "1d"
    })
    assert "success".encode() in response.data

def test_invalidView():
    response = app.test_client().post('/v0/getHistory', json = {
        "ticker" : "TSL",
        "year" : 2022,
        "month" : 1,
        "day" : 1,
        "year2": 2022,
        "month2": 2,
        "day2": 1,
        "interval" : "1d"
    })
    assert "Internal Server Error".encode() in response.data

def test_add():
    response = app.test_client().post('/v0/add', json = {
        "ticker" : "META"
    })
    assert response.status_code == 201
    
def test_getDescription():
    response = app.test_client().get('/v0/getDescription', query_string = {"id": "META" })
    assert response.status_code == 200

def test_invalidDescription():
    response = app.test_client().get('/v0/getDescription', query_string = {"id": "MET" })
    assert response.status_code == 400

def test_login():
    response = app.test_client().post('/v0/login', json = {
     "email" : "partick@ucsc.edu",
     "password":   "partick" 
    })
    assert response.status_code == 200

def test_invalidLogin():
    response = app.test_client().post('/v0/login', json = {
     "email" : "partick@ucsc.edu",
     "password":   "parick" 
    })
    assert response.status_code == 404

def test_create():
    response = app.test_client().post('/v0/create', json = {
        "email" : "demo@ucsc.edu",
        "password": "demo"
    })
    if "account already exists".encode() in response.data:
        assert response.status_code == 400
    else:
        assert response.status_code == 201

def test_invalidCreate():
    response = app.test_client().post('/v0/create', json = {
        "email" : "demo@ucsc.edu",
        "password": "demo"
    })
    assert response.status_code == 400

def test_add():
    response = app.test_client().post('/v0/add', json = {
        "ticker": "CRM"
    })
    assert "Stock Added!".encode() in response.data
    assert response.status_code == 201

def test_marketIndexAdd():
    response = app.test_client().post('/v0/add', json = {
        "ticker" : "S&P 500"
    })
    assert "Market Indexes added!".encode() in response.data
    assert response.status_code == 201

def test_addPortfolio():
    response = app.test_client().post('v0/addPortfolio', json = {
        "useremail": "partick@ucsc.edu",
        "ticker" : "PATK"
    })
    assert "Added to Portfolio".encode() in response.data
    response = app.test_client().post('v0/addPortfolio', json = {
        "useremail": "partick@ucsc.edu",
        "ticker" : "TSLA"
    })
    assert "Added to Portfolio".encode() in response.data
    assert response.status_code == 200

def test_deleteFromPortfolio():
    response = app.test_client().delete('v0/deleteFromPortfolio', json = {
        "useremail": "partick@ucsc.edu",
        "ticker" : "PATK"
    })
    assert "deleted from portfolio".encode() in response.data
    assert response.status_code == 200

def test_invalidGetFromPortfolio():
    response = app.test_client().get('v0/getFromPortfolio', query_string = {"email": "a"})
    assert response.status_code == 404

def test_getFromPortfolio():
    response = app.test_client().get('v0/getFromPortfolio', query_string = {"email": "partick@ucsc.edu"})
    assert response.status_code == 200
