#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 28 12:45:35 2023

@author: ben
"""


from datetime import date
import openpyxl
#import seleniumScraper

def jsonListToExcel(stockList):
    """
    Description
    ----------
    Takes in list of stock info and formats it into an excel file
    
    Parameters
    ----------
    stockList : List of dictionaries

    Returns 
    -------
    null but writes an excel object to current directory
    """
    todays_date = date.today()
    year = todays_date.year
    month = todays_date.month
    day = todays_date.day
    today_formatted = str(month) + "-" + str(day) + "-" + str(year)
    
    wb = openpyxl.Workbook()
    sheet = wb.active
    sheet.title = "Stock Info"
    sheet["A1"] = today_formatted
    sheet["B1"] = "company"
    sheet["C1"] = "price"
    sheet["D1"] = "change"
    sheet["E1"] = "pChange"
    
    counter = 2
    
    # iterate through tickers and add to wb
    for i in stockList:
        sheet["A" + str(counter)] = i['symbol']
        sheet["B" + str(counter)] = i['company']
        sheet["C" + str(counter)] = i['price']
        sheet["D" + str(counter)] = i['change']
        sheet["E" + str(counter)] = i['dailyChange']
        counter += 1
        
    wb.save(filename = today_formatted + "StockInfo.xlsx")

