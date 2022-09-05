import grequests
import requests
import json
from pprint import pprint
import time
from datetime import datetime
from threading import Thread
import copy

from mysql.connector import connect, Error

hostSql = "127.0.0.1"
userSql = "root"
passwordSql = "root"
databaseSql = "huobibundles"

payMethod = {
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
cryptoAsset = {
  1: "BTC",
  2: "USDT",
  3: "ETH",
  4: "HT",
  5: "EOS",
  6: "HUSD",
  7: "XRP",
  8: "LTC",
}

asset = [1, 2, 3, 4, 5, 6, 7, 8]
payTypes = [24, 20, 29, 69, 25, 27, 361, 9, 19, 36, 172, 356, 357, 28]

options = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: []
}
options1 = []
options2 = []
options3 = []
options4 = []

for key1 in cryptoAsset:
  for key2 in payMethod:
    options1.append(
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

for x, element in enumerate(options1):
  options[x // 14].append(copy.deepcopy(element))

headers = {
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

params = {
  'coinId': '1',
  'currency': '11',
  'tradeType': 'sell',
  'currPage': '1',
  'payMethod': '0',
  'acceptOrder': '0',
  'country': '',
  'blockType': 'general',
  'online': '1',
  'range': '0',
  'amount': '',
  'onlyTradable': 'false',
  'isFollowed': 'false',
}

# Создание объекта для данных
dataSort = {}
dataSort[5000] = {}
for key2 in cryptoAsset:
  dataSort[5000][cryptoAsset[key2]] = {}
  for key3 in payMethod:
    dataSort[5000][cryptoAsset[key2]][payMethod[key3]] = {}
for key1 in range(10000, 310000, 10000):
  dataSort[key1] = {}
  for key2 in cryptoAsset:
    dataSort[key1][cryptoAsset[key2]] = {}
    for key3 in payMethod:
      dataSort[key1][cryptoAsset[key2]][payMethod[key3]] = {}


def defaultBundles(data, key):
  bundlesData = []
  
  for keyAsset in data[key]:
    for keyPayBuy in data[key][keyAsset]:

      for keyPaySell in data[key][keyAsset]:
        priceBuy = float(data[key][keyAsset][keyPayBuy]["price"])
        priceSell = float(data[key][keyAsset][keyPaySell]["price"])

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


def checkSortData(minLimit, data, asset, payTypes):
  global dataSort

  for item in data["data"]:
    minLimitData = int(item["minTradeLimit"][:-3])
    maxLimitData = int(item["maxTradeLimit"][:-3])

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSort[minLimit][asset][payTypes]["price"] = item["price"]
      dataSort[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSort[minLimit][asset][payTypes]["price"] = 0

def sortData(data, asset, payTypes):
  
  minLimit = 5000
  checkSortData(minLimit ,data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortData(minLimit, data, asset, payTypes)

def req(options, assetId):
  global threadingIndicator
  # global allData
  payTypesId = 0
  for p in options:
    try:
      response = requests.get("https://otc-api.ri16.com/v1/data/trade-market", params=p, headers=headers)
      if (payTypesId%14 == 0): payTypesId = 0
      sortData(json.loads(response.text), cryptoAsset[assetId + 1], payMethod[payTypes[payTypesId]])
      # allData.append(json.loads(response.text))
    except:
      try:
        pprint(response.status_code)
      except:
        print("Критическая ошибка запроса!")

    payTypesId += 1

  threadingIndicator += 1

while True:
  allData = []
  threadingIndicator = 0
  
  startTime = datetime.now()
    
  for x, key in enumerate(options):
    Thread(target=req, args=(options[key], x, )).start()

  while True:
    if (threadingIndicator == len(cryptoAsset)):
      endTime = datetime.now()
      print("Время затраченное на API запросы: " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)

  startTime = datetime.now()
  for key in dataSort:
    # defaultBundles(dataSort, key)
    Thread(target=defaultBundles, args=(dataSort, key, )).start()

  while True:
    if (threadingIndicator == len(dataSort)):
      endTime = datetime.now()
      print("Время затраченное на MySQL запросы: " + str(endTime - startTime))
      threadingIndicator = 0
      break
    time.sleep(0.5)

  with open("huobiData.json", "w") as outfile:
    json.dump(dataSort, outfile)
  
  # print('Finish')
  # input()

  # time.sleep(5)