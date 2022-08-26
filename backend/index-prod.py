import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint

from mysql.connector import connect, Error

timeJson = []
optionsBuy = []
exceptionIndicator = True

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


def bundles():
  bundlesData = []

  for key in dataSort:
    for keyAsset in dataSort[key]:
      for keyPayBuy in dataSort[key][keyAsset]:

        for keyPaySell in dataSort[key][keyAsset]:
          priceBuy = float(dataSort[key][keyAsset][keyPayBuy])
          priceSell = float(dataSort[key][keyAsset][keyPaySell])
          minLimit  = key
          maxLimit  = key + 9999
          if(priceBuy != 0 and priceSell != 0):
            liquidity = ((100/priceBuy) * priceSell)-100
            datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
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

  try:
    with connect(host="miha12x4.beget.tech", user="miha12x4_p2p", password="Mm_0214123771", database="miha12x4_p2p") as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      delete_bundles_query = "DELETE FROM bundles"
      alter_bundles_query = "ALTER TABLE bundles AUTO_INCREMENT = 1"
      insert_bundles_query = """
        INSERT INTO bundles (datetime, asset_buy, payTypes_buy, price_buy,
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
  checkSortData(minLimit, maxLimit, data, asset, payTypes)

  for minLimit in range(10000, 290000, 10000):
    maxLimit = minLimit + 9999
  checkSortData(minLimit, maxLimit, data, asset, payTypes)
  
  minLimit = 290000
  maxLimit = 300000
  checkSortData(minLimit, maxLimit, data, asset, payTypes)


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

while True:
  startTime = datetime.now()

  req()
  endTime = datetime.now()
  print("Время затраченное на API запросы: " + str(endTime - startTime))
  
  startTime = datetime.now()
  bundles()
  endTime = datetime.now()
  print("Время затраченное на MySQL запросы : " + str(endTime - startTime))
  time.sleep(5)