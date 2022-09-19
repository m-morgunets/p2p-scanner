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
hostSql = "server77.hosting.reg.ru"
userSql = "u1655934_default"
passwordSql = "qeqRlSET97uR8m1z"
defaultDatabaseSql = "u1655934_defaultbundles"
conversionDatabaseSql = "u1655934_conversionbundles"
huobiDatabaseSql = "u1655934_huobibundles"
interExchangeDatabaseSql = "u1655934_interexchange"
bizlatoDatabaseSql = "u1655934_bizlatobundles"
exchangeDataDatabaseSql = "u1655934_exchangedata"

timeJson = []
optionsBuy = []
conversionData = {}
currenciesData = []
exceptionIndicator = True

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

payTypesBinance = ["TinkoffNew", "RosBankNew", "RaiffeisenBank", "QIWI", "PostBankNew", "ABank",
  "RUBfiatbalance", "YandexMoneyNew", "MTSBank", "HomeCreditBank", "Payeer", "Advcash"]
asset = ["USDT", "BTC", "BUSD", "BNB", "ETH", "RUB", "SHIB"]

payMethodHuobi = {
  24: "Payeer",
  20: "Advcash",
  29: "Sberbank",
  69: "SBP",
  25: "AlfaBank",
  27: "VTBBANK",
  361: "Sovkombank",
  9: "QIWI",
  19: "YandexMoneyNew",
  36: "RaiffeisenBank",
  172: "HomeCreditBank",
  356: "MTSBank",
  357: "PostBankNew",
  28: "TinkoffNew",
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

headersBizlato = {
  'authority': 'bitzlato.bz',
  'accept': '*/*',
  'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'referer': 'https://bitzlato.bz/p2p/buy-btc-rub-tinkoff',
  'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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
    "RosBankNew": {},
    "RaiffeisenBank": {},
    "QIWI": {},
    "PostBankNew": {},
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

# Типы оплаты Bizlato с соотвествующим им стандартным именем
payTypesNameBizlato = {
  'rub-sberbank': 'Sberbank',
  'rub-tinkoff': 'TinkoffNew',
  'rub-alfa-bank': 'AlfaBank',
  'rub-vtb': 'VTBBANK',
  'rub-raiffeisen-bank': 'RaiffeisenBank',
  'rub-home-credit-bank': 'HomeCreditBank',
  'rub-mts-bank': 'MTSBank',
  'rub-qiwi': 'QIWI',
  'rub-sbp': 'SBP',
  'rub-yoomoney': 'YandexMoneyNew',
  'rub-payeer': 'Payeer',
  'rub-advcash': 'Advcash',
  'rub-pochta-bank': 'PostBankNew'
}
# Массив криптовалют Bizlato
assetBizlato  = ['BTC', 'ETH', 'BCH', 'LTC', 'DASH', 'DOGE', 'USDT', 'USDC']
# Массив типов оплат Bizlato
payTypesBizlato = ['rub-sberbank', 'rub-tinkoff', 'rub-alfa-bank', 'rub-vtb', 'rub-raiffeisen-bank', 'rub-home-credit-bank',
 'rub-mts-bank', 'rub-qiwi', 'rub-sbp', 'rub-yoomoney', 'rub-payeer', 'rub-advcash', 'rub-pochta-bank']

paramsBizlato = []
dataSortBizlato = {}
exceptionIndicator = True

# Формирование объекта для данных с Bizlato (с учётом цены)
dataSortBizlato[5000] = {}
for key1 in assetBizlato:
  dataSortBizlato[5000][key1] = {}
  for key2 in payTypesNameBizlato:
    dataSortBizlato[5000][key1][payTypesNameBizlato[key2]] = {}
for num in range(10000, 310000, 10000):
  dataSortBizlato[num] = {}
  for key1 in assetBizlato:
    dataSortBizlato[num][key1] = {}
    for key2 in payTypesNameBizlato:
      dataSortBizlato[num][key1][payTypesNameBizlato[key2]] = {}

# Формирование объекта для данных с Bizlato (без учёта цены)
zeroDataBizlato = {}
for key1 in assetBizlato:
  zeroDataBizlato[key1] = {}
  for key2 in payTypesNameBizlato:
    zeroDataBizlato[key1][payTypesNameBizlato[key2]] = {}

# Формирование массива параметров для запросов Bizlato
for key1 in assetBizlato:
  for key2 in payTypesBizlato:
    paramsBizlato.append(
    {
      'cryptocurrency': key1,
      'slug': key2,
      'amount': '',
      'lang': 'ru',
      'limit': '40',
      'skip': '0',
      'type': 'purchase',
      'currency': 'RUB',
      'isOwnerVerificated': 'false',
      'isOwnerTrusted': 'false',
      'isOwnerActive': 'false',
      'amountType': 'currency',
    }
  )


# Функция расчёта конвертационных связок внутри Binance и отправка их в БД
def conversionBundles(exchange, data, databaseSql, key):
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
                    exchange,
                    keyAssetBuy,
                    keyPayBuy,
                    str(priceBuy),
                    exchange,
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
        INSERT INTO bundles_""" + str(key) + """ (datetime, exchange_buy, asset_buy, payTypes_buy, price_buy,
          exchange_sell, asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
  except Error as e:
    print(e)
  
# Функция расчёта обычных связок внутри биржи (Binance, Huobi) и отправка в БД
def defaultBundles(exchange, data, zeroData, databaseSql, key):
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
                exchange,
                keyAsset,
                keyPayBuy,
                str(priceBuy),
                exchange,
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
        INSERT INTO bundles_""" + str(key) + """ (datetime, exchange_buy, asset_buy, payTypes_buy, price_buy,
          exchange_sell, asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
  except Error as e:
    print(e)

# Функция расчёта межбиржевых связок и отправка в БД
def interExchangeBundles(allData, allZeroData, databaseSql, key):
  bundlesData = []

  for itemBuy in allData:
    for itemSell in allZeroData:
      if(itemBuy != itemSell):
        bundlesData += enumerateBundles(itemBuy, allData[itemBuy], itemSell, allZeroData[itemSell], key)

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
  except Error as e:
    print(e)

# Функция для перебора данных (используется только в функции interExchangeBundles)
def enumerateBundles(exchangeBuy, dataBuy, exchangeSell, dataSell, key):
  bundlesData = []

  for keyAsset in dataBuy[key]:
    for keyPayBuy in dataBuy[key][keyAsset]:
      try:
        for keyPaySell in dataBuy[key][keyAsset]:
          priceBuy = float(dataBuy[key][keyAsset][keyPayBuy]["price"])
          priceSell = float(dataSell[keyAsset][keyPaySell]["price"])
          
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

# Функция отправляет в БД чистые данные с бирж
def exchangeDataSql(allExchangeZeroData, exchange, databaseSql):
  dataSql = []
  zeroData = copy.deepcopy(allExchangeZeroData)
  if(exchange == 'Huobi'):
    del zeroData['HUSD']

  keys = list(zeroData.keys())
  for keyPayBuy in zeroData[keys[0]]:
    arr = []
    payBuy  = ''
    for keyAsset in zeroData:
      arr.append(zeroData[keyAsset][keyPayBuy]['price'])
      payBuy = keyPayBuy
      
    dataSql += [([payBuy] + arr)]


  variables = ['payTypes']
  values = ['%s']
  for key in zeroData:
    variables.append(key)
    values.append("%s")

  variablesStr = ", ".join(variables)
  valuesStr = ", ".join(values)

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=databaseSql) as connection:
      delete_bundles_query = "DELETE FROM " + str(exchange).lower()
      insert_bundles_query = """
        INSERT INTO """ + str(exchange).lower() + """ (""" + variablesStr + """)
        VALUES (""" + valuesStr + """)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.executemany(insert_bundles_query, dataSql)
        connection.commit()
  except Error as e:
    print(e)

# Функция отправляет в БД данные об обмене валюты
def currenciesDataSql(allData, databaseSql):
  dataSql = []

  for key in allData:
    dataSql.append((
      str(key["asset1"]),
      str(key["asset2"]),
      key["price"]
    ))

  try:
    with connect(host=hostSql, user=userSql, password=passwordSql, database=databaseSql) as connection:
      delete_bundles_query = "DELETE FROM currenciesdata"
      insert_bundles_query = """
        INSERT INTO currenciesdata (asset_1, asset_2, price)
        VALUES (%s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.executemany(insert_bundles_query, dataSql)
        connection.commit()
  except Error as e:
    print(e)

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
    zeroDataBinance[asset][payTypes]["price"] = data["data"][1]["adv"]["price"]
  except:
    try:
      zeroDataBinance[asset][payTypes]["price"] = data["data"][0]["adv"]["price"]
    except:
      zeroDataBinance[asset][payTypes]["price"] = 0

  minLimit = 5000
  checkSortDataBinance(minLimit ,data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortDataBinance(minLimit, data, asset, payTypes)


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
    zeroDataHuobi[asset][payTypes]["price"] = data["data"][1]["price"]
  except:
    try:
      zeroDataHuobi[asset][payTypes]["price"] = data["data"][0]["price"]
    except:
      zeroDataHuobi[asset][payTypes]["price"] = 0
  
  minLimit = 5000
  checkSortDataHuobi(minLimit, data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortDataHuobi(minLimit, data, asset, payTypes)


def checkSortDataBizlato(minLimit, data, asset, payTypes):
  global dataSortBizlato

  for item in data["data"]:
    minLimitData = int(float(item["limitCurrency"]["min"]))
    maxLimitData = int(float(item["limitCurrency"]["max"]))

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSortBizlato[minLimit][asset][payTypes]["price"] = item["rate"]
      dataSortBizlato[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSortBizlato[minLimit][asset][payTypes]["price"] = 0

def sortDataBizlato(data, asset, payTypes):
  try:
    zeroDataBizlato[asset][payTypes]["price"] = data["data"][1]["rate"]
  except:
    try:
      zeroDataBizlato[asset][payTypes]["price"] = data["data"][0]["rate"]
    except:
      zeroDataBizlato[asset][payTypes]["price"] = 0

  minLimit = 5000
  checkSortDataBizlato(minLimit ,data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortDataBizlato(minLimit, data, asset, payTypes)


def exception_handler(request, exception):
  global exceptionIndicator
  print("Request failed")
  exceptionIndicator = False

def reqBinance():
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
        sortDataBinance(json.loads(key.text), asset[assetId // 12], payTypesBinance[payTypesId])
        payTypesId += 1
        assetId += 1
      except:
        print(key.status_code)
        time.sleep(60)
        reqBinance()
        payTypesId += 1
        assetId += 1

def reqHuobi(options, assetId):
  
  payTypesId = 0
  for p in options:
    # try:
    response = requests.get("https://otc-api.ri16.com/v1/data/trade-market", params=p, headers=headersHuobi)
    if (payTypesId%14 == 0): payTypesId = 0
    sortDataHuobi(json.loads(response.text), cryptoAssetHuobi[assetId + 1], payMethodHuobi[payTypesHuobi[payTypesId]])
    # except:
    #   try:
    #     pprint(response.status_code)
    #   except:
    #     print("Критическая ошибка запроса!")

    payTypesId += 1

def reqBizlato():
  global exceptionIndicator
  exceptionIndicator = True
  data = (grequests.get('https://bitzlato.bz/api2/p2p/public/exchange/dsa/', params=p, headers=headersBizlato) for p in paramsBizlato)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    payTypesId = 0
    assetId = 0
    for key in result:
      try:
        if (payTypesId%13 == 0): payTypesId = 0
        # allData.append(json.loads(key.text))
        sortDataBizlato(json.loads(key.text), assetBizlato[assetId // 13], payTypesNameBizlato[payTypesBizlato[payTypesId]])
        payTypesId += 1
        assetId += 1
      except:
        print(key.status_code)
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
        currenciesData.append({
          "asset1": currenciesBuy,
          "asset2": currenciesSell,
          "price": float(dataJson["price"])
        })
        conversionData[currenciesBuy + currenciesSell] = float(dataJson["price"])
        conversionData[currenciesSell + currenciesBuy] = (1 / float(dataJson["price"]))
      except:
        print(key.status_code)

while True:

  # Запросы для расчёта обычных связок
  startTime = datetime.now()
  reqBinance()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Binance p2p): " + str(endTime - startTime))
  
  # Запросы курса (по маркету) для конвертационных связок
  startTime = datetime.now()
  currenciesData = []
  
  conversionReq()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Binance курсы валют): " + str(endTime - startTime))

  # Отправка данных об обмене криптовалюты в БД
  startTime = datetime.now()
  currenciesDataSql(currenciesData, exchangeDataDatabaseSql)
  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (Обмен валюты): " + str(endTime - startTime))

  # Расчёт обычых связок и оиправка их в БД
  startTime = datetime.now()
  threads = []

  for key in dataSortBinance:
    t = Thread(target=defaultBundles, args=("Binance", dataSortBinance, zeroDataBinance, defaultDatabaseSql, key, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (default): " + str(endTime - startTime))

  # Расчёт конвертационных связок и оиправка их в БД
  startTime = datetime.now()
  threads = []

  for key in dataSortBinance:
    t = Thread(target=conversionBundles, args=("Binance", dataSortBinance, conversionDatabaseSql, key, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()
    
  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (conversion): " + str(endTime - startTime))


  # Запросы для получения данных с Huobi
  startTime = datetime.now()
  threads = []

  for x, key in enumerate(optionsHuobi):
    t = Thread(target=reqHuobi, args=(optionsHuobi[key], x, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на API запросы (Huobi p2p): " + str(endTime - startTime))


  # Расчёт связок Huobi и оиправка их в БД
  startTime = datetime.now()
  threads = []

  for key in dataSortHuobi:
    t = Thread(target=defaultBundles, args=("Huobi", dataSortHuobi, zeroDataHuobi, huobiDatabaseSql, key, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (Huobi): " + str(endTime - startTime))
  
  # Запросы для получения данных с Bizlato
  startTime = datetime.now()
  reqBizlato()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Bizlato): " + str(endTime - startTime))

  # Расчёт связок Bizlato и оиправка их в БД
  startTime = datetime.now()
  threads = []

  for key in dataSortBizlato:
    # defaultBundles("Bizlato", dataSortBizlato, zeroDataBizlato, bizlatoDatabaseSql, key)
    t = Thread(target=defaultBundles, args=("Bizlato", dataSortBizlato, zeroDataBizlato, bizlatoDatabaseSql, key, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (Bizlato): " + str(endTime - startTime))

  # Расчёт межбиржевых связок и оиправка их в БД
  startTime = datetime.now()
  threads = []
  allExchangeData = {
    'Binance': dataSortBinance,
    'Huobi': dataSortHuobi,
    'Bizlato': dataSortBizlato
  }

  allExchangeZeroData = {
    'Binance': zeroDataBinance,
    'Huobi': zeroDataHuobi,
    'Bizlato': zeroDataBizlato
  }
  
  for key in dataSortBinance:
    # interExchangeBundles("Binance", dataSortBinance, 'Huobi', dataSortHuobi, interExchangeDatabaseSql, key)
    t= Thread(target=interExchangeBundles, 
      args=(allExchangeData, allExchangeZeroData, interExchangeDatabaseSql, key, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (Межбиржевые): " + str(endTime - startTime))

  # Отправка чистых данных в БД
  startTime = datetime.now()
  threads = []

  for key in allExchangeZeroData:
    # exchangeDataSql(allExchangeZeroData[key], key, exchangeDataDatabaseSql)
    t= Thread(target=exchangeDataSql, args=(allExchangeZeroData[key], key, exchangeDataDatabaseSql, ))
    threads.append(t)

  for x in threads:
    x.start()
  for x in threads:
    x.join()

  endTime = datetime.now()
  print("Время затраченное на MySQL запросы (Биржевые данные): " + str(endTime - startTime))