import requests
import json
import time
from datetime import datetime
from pprint import pprint

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
  "asset": "RUB",
  "fiat": "RUB",
  "merchantCheck": False,
  "page": 1,
  "rows": 10,
  "payTypes": [],
  "publisherType": None,
  "tradeType": "BUY",
}

data = {
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
}

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
      return dataJson["data"][0]["adv"]["price"]

def reqAsset():
  data["tinkoff"] = reqBase("Tinkoff")
  data["rosBank"] = reqBase("RosBank")
  data["raiffeisenBankRussia"] = reqBase("RaiffeisenBankRussia")
  data["qiwi"] = reqBase("QIWI")
  data["postBankRussia"] = reqBase("PostBankRussia")
  data["aBank"] = reqBase("ABank")
  data["rubFiatbalance"] = reqBase("RUBfiatbalance")
  data["yandexMoneyNew"] = reqBase("YandexMoneyNew")
  data["mtsBank"] = reqBase("MTSBank")
  data["homeCreditBank"] = reqBase("HomeCreditBank")
  data["payeer"] = reqBase("Payeer")
  data["advcash"] = reqBase("Advcash")

  print("Data update!")

while True:
  startTime = datetime.now()

  reqAsset()
  with open("dataBuy.json", "r") as outfile:
    dataJson = json.load(outfile)
  dataJson["USDT"] = data
  with open("dataBuy.json", "w") as outfile:
    json.dump(dataJson, outfile)

  endTime = datetime.now()
  print("Затраченное время: " + str(endTime - startTime))