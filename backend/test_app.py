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
    response = app.test_client().get('/v0/ticker/', query_string={"id": "UCSC"})
    res = json.loads(response.data.decode('utf-8'))
    assert type(res[0][0]) == list
    assert response.status_code == 200
    