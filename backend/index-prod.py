import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint
import copy

from threading import Thread

from mysql.connector import connect, Error



hostSql = "miha12x4.beget.tech"
defaultDatabaseSql = "miha12x4_default"
conversionDatabaseSql = "miha12x4_conver"
passwordSql = "Mm_0214123771"

timeJson = []
optionsBuy = []
conversionData = {}
exceptionIndicator = True
threadingIndicator = 0

conversionReqUrls = []
currencies = ["BTCUSDT", "BUSDUSDT", "BNBUSDT", "ETHUSDT", "USDTRUB",
  "SHIBUSDT", "BTCBUSD", "BNBBTC", "ETHBTC", "BTCRUB", "BNBBUSD",
  "ETHBUSD", "BUSDRUB", "SHIBBUSD", "BNBETH", "BNBRUB", "ETHRUB"]
  
currenciesnName = {
  "BTCUSDT": ["BTC", "USDT"],
  "BUSDUSDT": ["BUSD", "USDT"],
  "BNBUSDT": ["BNB", "USDT"],
  "ETHUSDT": ["ETH", "USDT"],
  "USDTRUB": ["USDT", "RUB"],
  "SHIBUSDT": ["SHIB", "USDT"],
  "BTCBUSD": ["BTC", "BUSD"],
  "BNBBTC": ["BNB", "BTC"],
  "ETHBTC": ["ETH", "BTC"],
  "BTCRUB": ["BTC", "RUB"],
  "BNBBUSD": ["BNB", "BUSD"],
  "ETHBUSD": ["ETH", "BUSD"],
  "BUSDRUB": ["BUSD", "RUB"],
  "SHIBBUSD": ["SHIB", "BUSD"],
  "BNBETH": ["BNB", "ETH"],
  "BNBRUB": ["BNB", "RUB"],
  "ETHRUB": ["ETH", "RUB"]
}

payTypes = ["TinkoffNew", "RosBank", "RaiffeisenBankRussia", "QIWI", "PostBankRussia", "ABank",
  "RUBfiatbalance", "YandexMoneyNew", "MTSBank", "HomeCreditBank", "Payeer", "Advcash"]
asset = ["USDT", "BTC", "BUSD", "BNB", "ETH", "RUB", "SHIB"]

headers = {
  "Accept": "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Content-Length": "123",
  "content-type": "application/json",
  "Host": "p2p.binance.com",
  "Origin": "https://p2p.binance.com",
  "Pragma": "no-cache",
  "TE": "Trailers",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
}

options = {
  "asset": "USDT",
  "fiat": "RUB",
  "merchantCheck": False,
  "page": 2,
  "rows": 20,
  "payTypes": [],
  "publisherType": None,
  "tradeType": "BUY",
}

dataBuy = {
  "USDT": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "BTC": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "BUSD": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "BNB": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "ETH": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "RUB": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
  "SHIB": {
    "TinkoffNew": {},
    "RosBank": {},
    "RaiffeisenBankRussia": {},
    "QIWI": {},
    "PostBankRussia": {},
    "ABank": {},
    "RUBfiatbalance": {},
    "YandexMoneyNew": {},
    "MTSBank": {},
    "HomeCreditBank": {},
    "Payeer": {},
    "Advcash": {},
  },
}

dataSort = {}
dataSort[5000] = copy.deepcopy(dataBuy)
for key in range(10000, 310000, 10000):
  dataSort[key] = copy.deepcopy(dataBuy)

for key1 in asset:
  for key2 in payTypes:
    optionsBuy.append(
    {
      "asset": key1,
      "fiat": "RUB",
      "merchantCheck": False,
      "page": 1,
      "rows": 20,
      "payTypes": [key2],
      "publisherType": None,
      "tradeType": "BUY",
    }
  )

for url in currencies:
  conversionReqUrls.append("https://api.binance.com/api/v3/ticker/price?symbol=" + url)


def conversionBundles(key):
  bundlesData = []
  
  for keyAssetBuy in dataSort[key]:

    for keyAssetSell in dataSort[key]:

      if (keyAssetBuy == keyAssetSell):
        break

      for keyPayBuy in dataSort[key][keyAssetBuy]:

        for keyPaySell in dataSort[key][keyAssetBuy]:
          if ((keyAssetBuy + keyAssetSell) in conversionData):
            priceBuy = float(dataSort[key][keyAssetBuy][keyPayBuy]["price"])
            priceSell = float(dataSort[key][keyAssetSell][keyPaySell]["price"])

            conversionPrice = conversionData[keyAssetBuy + keyAssetSell]
            
            if(priceBuy != 0 and priceSell != 0):
              liquidity = ((100/priceBuy) * conversionPrice * priceSell)-100
              datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
              if (liquidity > 0.1):
                bundlesData.append(
                  (
                    str(datetimeDb),
                    keyAssetBuy,
                    keyPayBuy,
                    str(priceBuy),
                    keyAssetSell,
                    keyPaySell,
                    str(priceSell),
                    str(liquidity)
                  )
                )

  try:
    with connect(host=hostSql, user=conversionDatabaseSql, password=passwordSql, database=conversionDatabaseSql) as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles_"+str(key)
      alter_bundles_query = "ALTER TABLE bundles_" + str(key) + " AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles_""" + str(key) + """ (datetime, asset_buy, payTypes_buy, price_buy,
          asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
      # print("INSERT performed")
  except Error as e:
    print(e)

  global threadingIndicator
  threadingIndicator += 1
  

def defaultBundles(key):
  bundlesData = []

  
  for keyAsset in dataSort[key]:
    for keyPayBuy in dataSort[key][keyAsset]:

      for keyPaySell in dataSort[key][keyAsset]:
        priceBuy = float(dataSort[key][keyAsset][keyPayBuy]["price"])
        priceSell = float(dataSort[key][keyAsset][keyPaySell]["price"])
        
        if(priceBuy != 0 and priceSell != 0):
          liquidity = ((100/priceBuy) * priceSell)-100
          datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
          if (liquidity > 0.1):
            bundlesData.append(
              (
                str(datetimeDb),
                keyAsset,
                keyPayBuy,
                str(priceBuy),
                keyAsset,
                keyPaySell,
                str(priceSell),
                str(liquidity)
              )
            )

  try:
    with connect(host=hostSql, user=defaultDatabaseSql, password=passwordSql, database=defaultDatabaseSql) as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles_"+str(key)
      alter_bundles_query = "ALTER TABLE bundles_" + str(key) + " AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles_""" + str(key) + """ (datetime, asset_buy, payTypes_buy, price_buy,
          asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
      # print("INSERT performed")
  except Error as e:
    print(e)

  global threadingIndicator
  threadingIndicator += 1

def checkSortData(minLimit, data, asset, payTypes):
  for item in data["data"]:
    minLimitData = int(item["adv"]["minSingleTransAmount"][:-3])
    maxLimitData = int(item["adv"]["dynamicMaxSingleTransAmount"][:-3])

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSort[minLimit][asset][payTypes]["price"] = item["adv"]["price"]
      dataSort[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSort[minLimit][asset][payTypes]["price"] = 0

def sortData(data, asset, payTypes):
  minLimit = 5000
  checkSortData(minLimit, data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortData(minLimit, data, asset, payTypes)



def exception_handler(request, exception):
  global exceptionIndicator
  print("Request failed")
  exceptionIndicator = False

def req():
  global exceptionIndicator
  exceptionIndicator = True
  data = (grequests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=d) for d in optionsBuy)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    payTypesId = 0
    assetId = 0
    for key in result:
      try:
        if (payTypesId%12 == 0): payTypesId = 0
        sortData(json.loads(key.text), asset[assetId // 12], payTypes[payTypesId])
        payTypesId += 1
        assetId += 1
      except:
        print(key.status_code)
        time.sleep(60)
        req()
        payTypesId += 1
        assetId += 1


def conversionReq():
  global exceptionIndicator
  exceptionIndicator = True
  data = (grequests.get(url) for url in conversionReqUrls)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    for key in result:
      try:
        dataJson = json.loads(key.text)
        currenciesBuy = currenciesnName[dataJson["symbol"]][0]
        currenciesSell = currenciesnName[dataJson["symbol"]][1]
        conversionData[currenciesBuy + currenciesSell] = float(dataJson["price"])
        conversionData[currenciesSell + currenciesBuy] = (1 / float(dataJson["price"]))
      except:
        print(key.status_code)
        time.sleep(60)
        conversionReq()


while True:
  # Запросы для расчёта обычных связок
  startTime = datetime.now()
  req()
  endTime = datetime.now()
  print("Время затраченное на API запросы: " + str(endTime - startTime))
  
  # Запросы курса (по маркету) для конвертационных связок
  startTime = datetime.now()
  conversionReq()
  endTime = datetime.now()
  print("Время затраченное на API запросы: " + str(endTime - startTime))

  # Расчёт обычых связок и оиправка их в БД
  startTime = datetime.now()
  for key in dataSort:
    Thread(target=defaultBundles, args=(key, )).start()

  while True:
    if (threadingIndicator == len(dataSort)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (default): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)

  # Расчёт конвертационных связок и оиправка их в БД
  startTime = datetime.now()
  for key in dataSort:
    Thread(target=conversionBundles, args=(key, )).start()

  while True:
    if (threadingIndicator == len(dataSort)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (conversion): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)


