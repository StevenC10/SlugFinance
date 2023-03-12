import timefrom selenium import webdriverfrom selenium.webdriver.common.by import Byfrom selenium.webdriver.support.wait import WebDriverWaitfrom selenium.webdriver.support import expected_conditions as ECfrom selenium.webdriver.common.action_chains import ActionChainsimport jsondef launchAndLogin(browser, user, pswd):    """    Description    ----------    Uses selenium to control firefox driver and logs into yahoo finance    Parameters    ----------    browser : webdriver    user : yahoo email    pswd : yahoo password        Returns    -------    Returns 0 on success    """    browser.get("https://finance.yahoo.com/")        print("----------")    try:        signInButton = WebDriverWait(browser, 10).until(            EC.presence_of_element_located((By.ID, "header-signin-link"))            )        signInButton.click()        print("button clicked!")    except:        # attempt to close popup        print("attempting to close pop up")        element = browser.find_element(By.XPATH, "//div[@class='lightbox-wrapper Ta(c) Pos(f) T(0) Start(0) H(100%) W(100%) Bgc(backgroundOverlay) Z(50) Op(1)']")        browser.execute_script("arguments[0].style.visibility='hidden'", element)        signInButton = WebDriverWait(browser, 10).until(            EC.presence_of_element_located((By.ID, "header-signin-link"))            )        signInButton.click()        # uncheck stay signed in            print("----------")      time.sleep(0.5)    persistent = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "helper-item")))    browser.execute_script("arguments[0].scrollIntoView();", persistent)    persistent.click()    print("checkbox clicked!")        # input email    email = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID, "login-username")))    #email = browser.find_element(By.ID, "login-username")    browser.execute_script("arguments[0].scrollIntoView();", email)    email.send_keys(user)        # click next    nextButton = browser.find_element(By.ID, "login-signin")    browser.execute_script("arguments[0].scrollIntoView();", nextButton)    nextButton.click()        # input password    time.sleep(0.5)    password = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID, "login-passwd")))    browser.execute_script("arguments[0].scrollIntoView();", password)    password.send_keys(pswd)        # click next again    nextButton = browser.find_element(By.ID, "login-signin")    browser.execute_script("arguments[0].scrollIntoView();", nextButton)    nextButton.click()    print("----------")    print("navigating to portfolio page...")    #myPortfolio = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.LINK_TEXT, "My Portfolio")))    #myPortfolio.click()    browser.get("https://finance.yahoo.com/portfolios")        return 0def getPortfolioData(browser, portfolio):    """    Description    ----------    Navigates to and scrapes tickers and data from portfolio        Parameters    ----------    browser : the webdriver    porfolio : name of portfolio        Returns     -------    list of json objects upon success, 1 on failure    """        # navigate to portfolio dropdown    print("----------")    print("navigating to portfolio...")    time.sleep(0.5)    myPortfolio = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.LINK_TEXT, portfolio)))    myPortfolio.click()        print("----------")    print("scraping...")        portfolioInfo = []    tickerWait = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, '//a[@data-test="quoteLink"]')))    tickers = browser.find_elements(By.XPATH, '//a[@data-test="quoteLink"]')      pricesWait = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, '//fin-streamer[@data-test="colorChange"]')))    prices = browser.find_elements(By.XPATH, '//fin-streamer[@data-test="colorChange"]')    counter = 0    for i in range(len(tickers)):        symbol = tickers[i].text        price = prices[i + counter].text        change = prices[i + counter + 1].text        percentChange = prices[i + counter + 2].text        stock = {            'symbol' : symbol,            'price' : price,            'change' : change,            'percentChange' : percentChange        }        #print(type(stock))        counter += 4        portfolioInfo.append(stock)    """      print("----------")    print("returning to portfolio page...")    browser.get("https://finance.yahoo.com/portfolios")    """        return portfolioInfo