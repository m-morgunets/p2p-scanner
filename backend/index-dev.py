import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint
import copy

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
huobiDatabaseSql = "huobibundles"
interExchangeDatabaseSql = "interexchange"

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

payTypesBinance = ["TinkoffNew", "RosBank", "RaiffeisenBankRussia", "QIWI", "PostBankRussia", "ABank",
  "RUBfiatbalance", "YandexMoneyNew", "MTSBank", "HomeCreditBank", "Payeer", "Advcash"]
asset = ["USDT", "BTC", "BUSD", "BNB", "ETH", "RUB", "SHIB"]

payMethodHuobi = {
  24: "PAYEER",
  20: "ADVCash",
  29: "Sberbank",
  69: "SBP - Fast Bank Transfer",
  25: "Alfa-bank",
  27: "VTB BANK",
  361: "Sovkombank",
  9: "QIWI",
  19: "Yandex",
  36: "Raiffeisenbank",
  172: "Home Credit Bank (Russia)",
  356: "MTS-Bank",
  357: "Post Bank",
  28: "Tinkoff",
}
cryptoAssetHuobi = {
  1: "BTC",
  2: "USDT",
  3: "ETH",
  4: "HT",
  5: "EOS",
  6: "HUSD",
  7: "XRP",
  8: "LTC",
}
payTypesHuobi = [24, 20, 29, 69, 25, 27, 361, 9, 19, 36, 172, 356, 357, 28]

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

headersHuobi = {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "content-type": "application/json",
    'authority': 'otc-api.ri16.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'client-type': 'web',
    'origin': 'https://www.huobi.com',
    'otc-language': 'ru-RU',
    'portal': 'web',
    'referer': 'https://www.huobi.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
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

dataSortBinance = {}
zeroDataBinance = copy.deepcopy(dataBuy)
dataSortBinance[5000] = copy.deepcopy(dataBuy)
for key in range(10000, 310000, 10000):
  dataSortBinance[key] = copy.deepcopy(dataBuy)

for key1 in asset:
  for key2 in payTypesBinance:
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

# Создание объекта для данных
dataSortHuobi = {}
zeroDataHuobi = {}
for key1 in cryptoAssetHuobi:
  zeroDataHuobi[cryptoAssetHuobi[key1]] = {}
  for key2 in payMethodHuobi:
    zeroDataHuobi[cryptoAssetHuobi[key1]][payMethodHuobi[key2]] = {}
dataSortHuobi[5000] = {}
for key1 in cryptoAssetHuobi:
  dataSortHuobi[5000][cryptoAssetHuobi[key1]] = {}
  for key2 in payMethodHuobi:
    dataSortHuobi[5000][cryptoAssetHuobi[key1]][payMethodHuobi[key2]] = {}
for key1 in range(10000, 310000, 10000):
  dataSortHuobi[key1] = {}
  for key2 in cryptoAssetHuobi:
    dataSortHuobi[key1][cryptoAssetHuobi[key2]] = {}
    for key3 in payMethodHuobi:
      dataSortHuobi[key1][cryptoAssetHuobi[key2]][payMethodHuobi[key3]] = {}

optionsHuobi = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: []
}
optionsHuobi1 = []
for key1 in cryptoAssetHuobi:
  for key2 in payMethodHuobi:
    optionsHuobi1.append(
    {
      'coinId': str(key1),
      'currency': '11',
      'tradeType': 'sell',
      'currPage': '1',
      'payMethod': str(key2),
      'acceptOrder': '0',
      'country': '',
      'blockType': 'general',
      'online': '1',
      'range': '0',
      'amount': '',
      'onlyTradable': 'false',
      'isFollowed': 'false',
    }
  )

for x, element in enumerate(optionsHuobi1):
  optionsHuobi[x // 14].append(copy.deepcopy(element))

# Функция расчёта конвертационных связок внутри Binance и отправка их в БД
def conversionBundles(data, databaseSql, key):
  bundlesData = []
  
  for keyAssetBuy in data[key]:

    for keyAssetSell in data[key]:

      if (keyAssetBuy == keyAssetSell):
        break

      for keyPayBuy in data[key][keyAssetBuy]:

        for keyPaySell in data[key][keyAssetBuy]:
          if ((keyAssetBuy + keyAssetSell) in conversionData):
            priceBuy = float(data[key][keyAssetBuy][keyPayBuy]["price"])
            priceSell = float(data[key][keyAssetSell][keyPaySell]["price"])

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
                    str(liquidity),
                  )
                )

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=databaseSql) as connection:
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

  # with open("conversionBundles.json", "w") as outfile:
  #   json.dump(bundlesData, outfile)
  
# Функция расчёта обычных связок внутри биржи (Binance, Huobi) и отправка в БД
def defaultBundles(data, zeroData, databaseSql, key):
  bundlesData = []

  
  for keyAsset in data[key]:
    for keyPayBuy in data[key][keyAsset]:

      for keyPaySell in data[key][keyAsset]:
        priceBuy = float(data[key][keyAsset][keyPayBuy]["price"])
        priceSell = float(zeroData[keyAsset][keyPaySell]["price"])

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
    with connect(host=hostSql, user=userSql, password=passwordSql, database=databaseSql) as connection:
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

# Функция расчёта межбиржевых связок и отправка в БД
def interExchangeBundles(exchange_1, data_1, exchange_2, data_2, databaseSql, key):
  bundlesData = []

  bundlesData += enumerateBundles(exchange_1, data_1, exchange_2, data_2, key)
  bundlesData += enumerateBundles(exchange_2, data_2, exchange_1, data_1, key)

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=databaseSql) as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles_"+str(key)
      alter_bundles_query = "ALTER TABLE bundles_" + str(key) + " AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles_""" + str(key) + """ (datetime, exchange_buy, asset_buy, payTypes_buy, price_buy,
        exchange_sell, asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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

# Функция для перебора данных (используется только в функции interExchangeBundles)
def enumerateBundles(exchangeBuy, dataBuy, exchangeSell, dataSell, key):
  bundlesData = []

  for keyAsset in dataBuy[key]:
    for keyPayBuy in dataBuy[key][keyAsset]:
      try:
        for keyPaySell in dataSell[key][keyAsset]:
          priceBuy = float(dataBuy[key][keyAsset][keyPayBuy]["price"])
          priceSell = float(dataSell[key][keyAsset][keyPaySell]["price"])
          
          if(priceBuy != 0 and priceSell != 0):
            liquidity = ((100/priceBuy) * priceSell)-100
            datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            if (liquidity > 0.1):
              bundlesData.append(
                (
                  str(datetimeDb),
                  exchangeBuy,
                  keyAsset,
                  keyPayBuy,
                  str(priceBuy),
                  exchangeSell,
                  keyAsset,
                  keyPaySell,
                  str(priceSell),
                  str(liquidity)
                )
              )
      except:
        pass
      

  return bundlesData


def checkSortDataBinance(minLimit, data, asset, payTypes):
  global dataSortBinance

  for item in data["data"]:
    minLimitData = int(item["adv"]["minSingleTransAmount"][:-3])
    maxLimitData = int(item["adv"]["dynamicMaxSingleTransAmount"][:-3])

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSortBinance[minLimit][asset][payTypes]["price"] = item["adv"]["price"]
      dataSortBinance[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSortBinance[minLimit][asset][payTypes]["price"] = 0

def sortDataBinance(data, asset, payTypes):
  try:
    zeroDataBinance[asset][payTypes]["price"] = data["data"][0]["adv"]["price"]
  except:
    try:
      zeroDataBinance[asset][payTypes]["price"] = data["data"][1]["adv"]["price"]
    except:
      zeroDataBinance[asset][payTypes]["price"] = 0

  minLimit = 5000
  # print(minLimit, '-', maxLimit)
  checkSortDataBinance(minLimit ,data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    # print(minLimit, '-', maxLimit)
    checkSortDataBinance(minLimit, data, asset, payTypes)

  # pprint(data)


def checkSortDataHuobi(minLimit, data, asset, payTypes):
  global dataSortHuobi

  for item in data["data"]:
    minLimitData = int(item["minTradeLimit"][:-3])
    maxLimitData = int(item["maxTradeLimit"][:-3])

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSortHuobi[minLimit][asset][payTypes]["price"] = item["price"]
      dataSortHuobi[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSortHuobi[minLimit][asset][payTypes]["price"] = 0

def sortDataHuobi(data, asset, payTypes):
  try:
    zeroDataHuobi[asset][payTypes]["price"] = data["data"][0]["price"]
  except:
    try:
      zeroDataHuobi[asset][payTypes]["price"] = data["data"][1]["price"]
    except:
      zeroDataHuobi[asset][payTypes]["price"] = 0
  
  minLimit = 5000
  checkSortDataHuobi(minLimit, data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortDataHuobi(minLimit, data, asset, payTypes)

def exception_handler(request, exception):
  global exceptionIndicator
  print("Request failed")
  exceptionIndicator = False

def reqBinance():
  global exceptionIndicator
  exceptionIndicator = True
  data = (grequests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=d) for d in optionsBuy)
  result = grequests.map(data, exception_handler=exception_handler)

  # dataJson = []

  if (exceptionIndicator):
    payTypesId = 0
    assetId = 0
    for key in result:
      try:
        if (payTypesId%12 == 0): payTypesId = 0
        # dataJson.append(json.loads(key.text))
        sortDataBinance(json.loads(key.text), asset[assetId // 12], payTypesBinance[payTypesId])
        payTypesId += 1
        assetId += 1
      except:
        print(key.status_code)
        time.sleep(60)
        reqBinance()
        payTypesId += 1
        assetId += 1
  
  # with open("dataSort.json", "w") as outfile:
  #   json.dump(dataSort, outfile)
  # with open("data.json", "w") as outfile:
  #   json.dump(dataJson, outfile)
  # print("Write successful")
  # input()

def reqHuobi(options, assetId):
  global threadingIndicator
  
  payTypesId = 0
  for p in options:
    try:
      response = requests.get("https://otc-api.ri16.com/v1/data/trade-market", params=p, headers=headersHuobi)
      if (payTypesId%14 == 0): payTypesId = 0
      sortDataHuobi(json.loads(response.text), cryptoAssetHuobi[assetId + 1], payMethodHuobi[payTypesHuobi[payTypesId]])
    except:
      try:
        pprint(response.status_code)
      except:
        print("Критическая ошибка запроса!")

    payTypesId += 1

  threadingIndicator += 1

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
      #   time.sleep(60)
      #   conversionReq()


while True:
  threadingIndicator = 0

  # Запросы для расчёта обычных связок
  startTime = datetime.now()
  reqBinance()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Binance p2p): " + str(endTime - startTime))
  
  # Запросы курса (по маркету) для конвертационных связок
  startTime = datetime.now()
  conversionReq()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Binance курсы валют): " + str(endTime - startTime))
  # pprint(conversionData)
  # input()

  # Расчёт обычых связок и оиправка их в БД
  startTime = datetime.now()
  for key in dataSortBinance:
    Thread(target=defaultBundles, args=(dataSortBinance, zeroDataBinance, defaultDatabaseSql, key, )).start()

  while True:
    if (threadingIndicator == len(dataSortBinance)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (default): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)

  # Расчёт конвертационных связок и оиправка их в БД
  startTime = datetime.now()
  for key in dataSortBinance:
    Thread(target=conversionBundles, args=(dataSortBinance, conversionDatabaseSql, key, )).start()

  while True:
    if (threadingIndicator == len(dataSortBinance)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (conversion): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)


  # Запросы для получения данных с Huobi
  startTime = datetime.now()

  for x, key in enumerate(optionsHuobi):
    # reqHuobi(optionsHuobi[key], x)
    Thread(target=reqHuobi, args=(optionsHuobi[key], x, )).start()

  while True:
    if (threadingIndicator == len(cryptoAssetHuobi)):
      endTime = datetime.now()
      print("Время затраченное на API запросы (Huobi p2p): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)


  # Расчёт связок Huobi и оиправка их в БД
  startTime = datetime.now()
  for key in dataSortHuobi:
    Thread(target=defaultBundles, args=(dataSortHuobi, zeroDataHuobi, huobiDatabaseSql, key, )).start()

  while True:
    if (threadingIndicator == len(dataSortHuobi)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (Huobi): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)

  # Расчёт межбиржевых связок (Binance, Huobi) и оиправка их в БД
  startTime = datetime.now()
  for key in dataSortBinance:
    # interExchangeBundles("Binance", dataSortBinance, 'Huobi', dataSortHuobi, interExchangeDatabaseSql, key)
    Thread(target=interExchangeBundles, 
      args=("Binance", dataSortBinance, 'Huobi', dataSortHuobi, interExchangeDatabaseSql, key, )).start()

  while True:
    if (threadingIndicator == len(dataSortHuobi)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы (Межиржевые Binance + Huobi): " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)