import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint

from threading import Thread

from mysql.connector import connect, Error



# hostSql = "miha12x4.beget.tech"
# userSql = "miha12x4_p2p"
# passwordSql = "Mm_0214123771"
# databaseSql = "miha12x4_p2p"
hostSql = "127.0.0.1"
userSql = "root"
passwordSql = "root"
defaultDatabaseSql = "defaultbundles"
conversionDatabaseSql = "conversionbundles"

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
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "BTC": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "BUSD": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "BNB": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "ETH": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "RUB": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
  "SHIB": {
    "TinkoffNew": 0,
    "RosBank": 0,
    "RaiffeisenBankRussia": 0,
    "QIWI": 0,
    "PostBankRussia": 0,
    "ABank": 0,
    "RUBfiatbalance": 0,
    "YandexMoneyNew": 0,
    "MTSBank": 0,
    "HomeCreditBank": 0,
    "Payeer": 0,
    "Advcash": 0,
  },
}

dataSort = {}
dataSort[5000] = dataBuy
for key in range(10000, 300000, 10000):
  dataSort[key] = dataBuy

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
            priceBuy = float(dataSort[key][keyAssetBuy][keyPayBuy])
            priceSell = float(dataSort[key][keyAssetSell][keyPaySell])

            conversionPrice = conversionData[keyAssetBuy + keyAssetSell]

            minLimit  = key
            maxLimit  = key + 9999
            if (minLimit == 5000):
              maxLimit = 9999
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
                    str(liquidity),
                    minLimit,
                    maxLimit,
                  )
                )

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=conversionDatabaseSql) as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles_"+str(key)
      alter_bundles_query = "ALTER TABLE bundles_" + str(key) + " AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles_""" + str(key) + """ (datetime, asset_buy, payTypes_buy, price_buy,
          asset_sell, payTypes_sell, price_sell, liquidity, min_limit, max_limit)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
      print("INSERT performed")
  except Error as e:
    print(e)

  global threadingIndicator
  threadingIndicator += 1

  with open("conversionBundles.json", "w") as outfile:
    json.dump(bundlesData, outfile)
  

def defaultBundles(key):
  bundlesData = []

  
  for keyAsset in dataSort[key]:
    for keyPayBuy in dataSort[key][keyAsset]:

      for keyPaySell in dataSort[key][keyAsset]:
        priceBuy = float(dataSort[key][keyAsset][keyPayBuy])
        priceSell = float(dataSort[key][keyAsset][keyPaySell])
        minLimit  = key
        maxLimit  = key + 9999
        if (minLimit == 5000):
          maxLimit = 9999
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
                str(liquidity),
                minLimit,
                maxLimit,
              )
            )

  # print(bundlesData)
  # with open("bundles.json", "w") as outfile:
  #   json.dump(bundlesData, outfile)
  # print("Write")
  # input()

  # try:
  #   with connect(host="miha12x4.beget.tech", user="miha12x4_p2p", password="Mm_0214123771", database="miha12x4_p2p") as connection:
  #     delete_bundles_query = "DELETE FROM bundles"
  #     alter_bundles_query = "ALTER TABLE bundles AUTO_INCREMENT = 1"
  #     with connection.cursor() as cursor:
  #       cursor.execute(delete_bundles_query)
  #       cursor.execute(alter_bundles_query)
  #       connection.commit()
  #     # print("DELETE performed")
  # except Error as e:
  #   print(e)

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=defaultDatabaseSql) as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles_"+str(key)
      alter_bundles_query = "ALTER TABLE bundles_" + str(key) + " AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles_""" + str(key) + """ (datetime, asset_buy, payTypes_buy, price_buy,
          asset_sell, payTypes_sell, price_sell, liquidity, min_limit, max_limit)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
      print("INSERT performed")
  except Error as e:
    print(e)

  global threadingIndicator
  threadingIndicator += 1

# def repeatedReq(asset, payTypes, tradeType):
  # options["asset"] = asset;
  # options["tradeType"] = tradeType;
  # options["payTypes"] = [payTypes];
  # print("Повторный запрос", asset, payTypes)
  # response = requests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=options)
  # return json.loads(response.text)

# def sortDataBuy(data, asset, payTypes):
  # if data["total"] == 0:
    # data = repeatedReq(asset, payTypes, "BUY")
  # else:
  # try:
  #   dataBuy[asset][payTypes] = data["data"][1]["adv"]["price"] 
  # except:
  #   try:
  #     dataBuy[asset][payTypes] = data["data"][0]["adv"]["price"]
  #   except: 
  #     print("Неудачный запрос:", asset, payTypes)
  #     dataBuy[asset][payTypes] = 1

def checkSortData(minLimit, maxLimit, data, asset, payTypes):
  for item in data["data"]:
    minLimitData = int(item["adv"]["minSingleTransAmount"][:-3])
    maxLimitData = int(item["adv"]["maxSingleTransAmount"][:-3])
    if ((minLimit >= minLimitData) and (maxLimit <= maxLimitData)):
      dataSort[minLimit][asset][payTypes] = item["adv"]["price"]
      break

def sortData(data, asset, payTypes):
  minLimit = 5000
  maxLimit = 9999
  # print(minLimit, '-', maxLimit)
  checkSortData(minLimit, maxLimit, data, asset, payTypes)

  for minLimit in range(10000, 290000, 10000):
    maxLimit = minLimit + 9999
    # print(minLimit, '-', maxLimit)
  checkSortData(minLimit, maxLimit, data, asset, payTypes)
  
  minLimit = 290000
  maxLimit = 300000
  checkSortData(minLimit, maxLimit, data, asset, payTypes)

  # with open("dataSort.json", "w") as outfile:
  #   json.dump(dataSort, outfile)
  # input()
  # pprint(data)


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
  
  # with open("dataSort.json", "w") as outfile:
  #   json.dump(dataSort, outfile)
  # print("Write successful")
  # input()


def conversionReq():
  global exceptionIndicator
  exceptionIndicator = True
  data = (grequests.get(url) for url in conversionReqUrls)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    for key in result:
      # try:
      dataJson = json.loads(key.text)
      currenciesBuy = currenciesnName[dataJson["symbol"]][0]
      currenciesSell = currenciesnName[dataJson["symbol"]][1]
      conversionData[currenciesBuy + currenciesSell] = float(dataJson["price"])
      conversionData[currenciesSell + currenciesBuy] = (1 / float(dataJson["price"]))
      # except:
      #   print(key.status_code)
      #   time.sleep(60)
      #   conversionReq()


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
  pprint(conversionData)
  input()

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


