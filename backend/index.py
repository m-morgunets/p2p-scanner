import os
import requests
import json
import time
from datetime import datetime
from pprint import pprint

from mysql.connector import connect, Error

# import threading

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
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BTC": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BUSD": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BNB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "ETH": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "RUB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "SHIB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
}

dataSell = {
  "USDT": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BTC": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BUSD": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "BNB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "ETH": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "RUB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
  "SHIB": {
    "tinkoff": 0,
    "rosBank": 0,
    "raiffeisenBankRussia": 0,
    "qiwi": 0,
    "postBankRussia": 0,
    "aBank": 0,
    "rubFiatbalance": 0,
    "yandexMoneyNew": 0,
    "mtsBank": 0,
    "homeCreditBank": 0,
    "payeer": 0,
    "advcash": 0,
  },
}

os.environ['no_proxy'] = '127.0.0.1,localhost'

def reqBase(payTypes):
  options["payTypes"] = [payTypes]
  response = requests.post("https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", headers=headers, json=options)
  dataJson = json.loads(response.text)

  if dataJson["data"] == 'null':
    return Null
  else:
    try:
      return dataJson["data"][1]["adv"]["price"] 
    except:
      print(payTypes)
      return dataJson["data"][0]["adv"]["price"]


def reqAssetBuy(asset):
  options["asset"] = asset
  options["tradeType"] = "BUY"

  dataBuy[asset]["tinkoff"] = reqBase("Tinkoff")
  dataBuy[asset]["rosBank"] = reqBase("RosBank")
  dataBuy[asset]["raiffeisenBankRussia"] = reqBase("RaiffeisenBankRussia")
  dataBuy[asset]["qiwi"] = reqBase("QIWI")
  dataBuy[asset]["postBankRussia"] = reqBase("PostBankRussia")
  dataBuy[asset]["aBank"] = reqBase("ABank")
  dataBuy[asset]["rubFiatbalance"] = reqBase("RUBfiatbalance")
  dataBuy[asset]["yandexMoneyNew"] = reqBase("YandexMoneyNew")
  dataBuy[asset]["mtsBank"] = reqBase("MTSBank")
  dataBuy[asset]["homeCreditBank"] = reqBase("HomeCreditBank")
  dataBuy[asset]["payeer"] = reqBase("Payeer")
  dataBuy[asset]["advcash"] = reqBase("Advcash")
  
  print("Data update!")

  # try:
  #   with connect(host="127.0.0.1", user="root", password="root", database="p2p") as connection:
  #     datetimeDb = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
  #     create_db_query = """
  #       INSERT INTO """ + table + """ (datetime, Tinkoff, RosBank, RaiffeisenBankRussia,
  #         QIWI, PostBankRussia, ABank, RUBfiatbalance, YandexMoneyNew, MTSBank, HomeCreditBank, Payeer, Advcash)
  #       VALUES 
  #         ('""" + datetimeDb +"""',
  #         """ + tinkoff + """, """ + rosBank + """, 
  #         """ + raiffeisenBankRussia + """, """ + qiwi + """,
  #         """ + postBankRussia + """, """ + aBank + """,
  #         """ + rubFiatbalance + """, """ + yandexMoneyNew + """,
  #         """ + mtsBank + """, """ + homeCreditBank + """,
  #         """ + payeer + """, """ + advcash + """)
  #     """
  #     print(create_db_query)
  #     print("Data update")
  #     with connection.cursor() as cursor:
  #       cursor.execute(create_db_query)
  #       connection.commit()
  # except Error as e:
  #   print(e)

def reqAssetSell(asset):
  options["asset"] = asset
  options["tradeType"] = "SELL"

  dataSell[asset]["tinkoff"] = reqBase("Tinkoff")
  dataSell[asset]["rosBank"] = reqBase("RosBank")
  dataSell[asset]["raiffeisenBankRussia"] = reqBase("RaiffeisenBankRussia")
  dataSell[asset]["qiwi"] = reqBase("QIWI")
  dataSell[asset]["postBankRussia"] = reqBase("PostBankRussia")
  dataSell[asset]["aBank"] = reqBase("ABank")
  dataSell[asset]["rubFiatbalance"] = reqBase("RUBfiatbalance")
  dataSell[asset]["yandexMoneyNew"] = reqBase("YandexMoneyNew")
  dataSell[asset]["mtsBank"] = reqBase("MTSBank")
  dataSell[asset]["homeCreditBank"] = reqBase("HomeCreditBank")
  dataSell[asset]["payeer"] = reqBase("Payeer")
  dataSell[asset]["advcash"] = reqBase("Advcash")
  
  print("Data update!")

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
      print("DELETE performed")
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
      # print("INSERT performed")
  except Error as e:
    print(e)


while True:
  startTime = datetime.now()
  print(startTime)
  reqAssetBuy("USDT")
  reqAssetBuy("BTC")
  reqAssetBuy("BUSD")
  reqAssetBuy("BNB")
  reqAssetBuy("ETH")
  reqAssetBuy("RUB")
  reqAssetBuy("SHIB")
  # with open("dataBuy.json", "w") as outfile:
  #   json.dump(dataBuy, outfile)

  reqAssetSell("USDT")
  reqAssetSell("BTC")
  reqAssetSell("BUSD")
  reqAssetSell("BNB")
  reqAssetSell("ETH")
  reqAssetSell("RUB")
  reqAssetSell("SHIB")
  endTime = datetime.now()
  print("Время затраченное на API запросы: " + str(endTime - startTime))
  # with open("dataSell.json", "w") as outfile:
  #   json.dump(dataSell, outfile)

  startTime = datetime.now()
  bundles()
  endTime = datetime.now()
  print("Время затраченное на MySQL запросы : " + str(endTime - startTime))

