import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint

from mysql.connector import connect, Error


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
  "page": 1,
  "rows": 5,
  "payTypes": [],
  "publisherType": None,
  "tradeType": "BUY",
}

dataBuy = {
  "USDT": {
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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

dataSell = {
  "USDT": {
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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
    "Tinkoff": 0,
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


def bundles():
  bundlesData = []

  for keyAsset in dataBuy:
    for keyPayBuy in dataBuy[keyAsset]:

      for keyPaySell in dataSell[keyAsset]:
        priceBuy = float(dataBuy[keyAsset][keyPayBuy])
        priceSell = float(dataSell[keyAsset][keyPaySell])
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
            str(liquidity)
          )
        )

  # print(bundlesData)
  # with open("bundles.json", "w") as outfile:
  #   json.dump(bundlesData, outfile)

  try:
    with connect(host="127.0.0.1", user="root", password="root", database="p2p") as connection:
      delete_bundles_query = "DELETE FROM bundles"
      alter_bundles_query = "ALTER TABLE bundles AUTO_INCREMENT = 1"
      with connection.cursor() as cursor:
        cursor.execute(delete_bundles_query)
        cursor.execute(alter_bundles_query)
        connection.commit()
      # print("DELETE performed")
  except Error as e:
    print(e)

  try:
    with connect(host="127.0.0.1", user="root", password="root", database="p2p") as connection:
      datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
      insert_bundles_query = """
        INSERT INTO bundles (datetime, asset_buy, payTypes_buy, price_buy,
          asset_sell, payTypes_sell, price_sell, liquidity)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
      """
      with connection.cursor() as cursor:
        cursor.executemany(insert_bundles_query, bundlesData)
        connection.commit()
      print("INSERT performed")
  except Error as e:
    print(e)

payTypes = ["Tinkoff", "RosBank", "RaiffeisenBankRussia", "QIWI", "PostBankRussia", "ABank",
  "RUBfiatbalance", "YandexMoneyNew", "MTSBank", "HomeCreditBank", "Payeer", "Advcash"]

asset = ["USDT", "BTC", "BUSD", "BNB", "ETH", "RUB", "SHIB"]

optionsBuy = []
optionsSell = []

for key1 in asset:
  for key2 in payTypes:
    optionsBuy.append(
    {
      "asset": key1,
      "fiat": "RUB",
      "merchantCheck": False,
      "page": 1,
      "rows": 5,
      "payTypes": [key2],
      "publisherType": None,
      "tradeType": "BUY",
    }
  )

for key1 in asset:
  for key2 in payTypes:
    optionsSell.append(
    {
      "asset": key1,
      "fiat": "RUB",
      "merchantCheck": False,
      "page": 1,
      "rows": 5,
      "payTypes": [key2],
      "publisherType": None,
      "tradeType": "SELL",
    }
  )

timeJson = []

def repeatedReq(asset, payTypes, tradeType):
  options["asset"] = asset;
  options["tradeType"] = tradeType;
  options["payTypes"] = [payTypes];
  print("Повторный запрос", asset, payTypes)
  response = requests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=options)
  return json.loads(response.text)

def sortDataBuy(data, asset, payTypes):
  # if data["total"] == 0:
    # data = repeatedReq(asset, payTypes, "BUY")
  # else:
  try:
    dataBuy[asset][payTypes] = data["data"][1]["adv"]["price"] 
  except:
    try:
      dataBuy[asset][payTypes] = data["data"][0]["adv"]["price"]
    except: 
      print("Неудачный запрос:", asset, payTypes)
      dataBuy[asset][payTypes] = 1

def sortDataSell(data, asset, payTypes):
  # if data["total"] == 0:
    # data = repeatedReq(asset, payTypes, "SELL")
  # else:
  try:
    dataSell[asset][payTypes] = data["data"][1]["adv"]["price"] 
  except:
    try:
      dataSell[asset][payTypes] = data["data"][0]["adv"]["price"]
    except: 
      print("Неудачный запрос:", asset, payTypes)
      dataSell[asset][payTypes] = 1


def exception_handler(request, exception):
  print("Request failed")
  time.sleep(10)

def reqBuy():
  data = (grequests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", json=d) for d in optionsBuy)
  result = grequests.map(data, exception_handler=exception_handler)
  payTypesId = 0
  assetId = 0
  for key in result:
    try:
      dataJson = json.loads(key.text)
      if (payTypesId%12 == 0): payTypesId = 0
      sortDataBuy(dataJson, asset[assetId // 12], payTypes[payTypesId])
      payTypesId += 1
      assetId += 1
    except:
      print(key.status_code)
      time.sleep(60)
      reqBuy()
      payTypesId += 1
      assetId += 1

def reqSell():
  data = (grequests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=d) for d in optionsSell)
  result = grequests.map(data, exception_handler=exception_handler)
  payTypesId = 0
  assetId = 0
  for key in result:
    try:
      dataJson = json.loads(key.text)
      if (payTypesId%12 == 0): payTypesId = 0
      sortDataSell(dataJson, asset[assetId // 12], payTypes[payTypesId])
      payTypesId += 1
      assetId += 1
    except:
      print(key.status_code)
      time.sleep(60)
      reqBuy()

while True:
  startTime = datetime.now()

  reqBuy()
  time.sleep(5)
  reqSell()
  time.sleep(5)

  endTime = datetime.now()
  print("Время затраченное на API запросы: " + str(endTime - startTime))
  # timeJson.append(str(endTime - startTime))
  # with open("time.json", "w") as outfile:
  #   json.dump(timeJson, outfile)

  startTime = datetime.now()
  bundles()
  endTime = datetime.now()
  print("Время затраченное на MySQL запросы : " + str(endTime - startTime))


