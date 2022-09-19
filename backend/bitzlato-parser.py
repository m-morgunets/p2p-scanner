import grequests
import requests
import json
from pprint import pprint
from datetime import datetime
import copy
from threading import Thread
from mysql.connector import connect, Error


hostSql = "server77.hosting.reg.ru"
userSql = "u1655934_default"
passwordSql = "qeqRlSET97uR8m1z"

bizlatoDatabaseSql = "u1655934_bizlatobundles"

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

params = {
  'slug': 'rub-tinkoff',
  'cryptocurrency': 'BTC',
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

payTypesNameBizlato = {
  'rub-sberbank': 'Sberbank',
  'rub-tinkoff': 'TinkoffNew',
  'rub-alfa-bank': 'AlfaBank',
  'rub-vtb': 'VTBBANK',
  'rub-raiffeisen-bank': 'RaiffeisenBankRussia',
  'rub-home-credit-bank': 'HomeCreditBank',
  'rub-mts-bank': 'MTSBank',
  'rub-qiwi': 'QIWI',
  'rub-sbp': 'SBP',
  'rub-yoomoney': 'YandexMoneyNew',
  'rub-payeer': 'Payeer',
  'rub-advcash': 'Advcash',
  'rub-pochta-bank': 'PostBankRussia'
}

assetBizlato  = ['BTC', 'ETH', 'BCH', 'LTC', 'DASH', 'DOGE', 'USDT', 'USDC']
payTypesBizlato = ['rub-sberbank', 'rub-tinkoff', 'rub-alfa-bank', 'rub-vtb', 'rub-raiffeisen-bank', 'rub-home-credit-bank',
 'rub-mts-bank', 'rub-qiwi', 'rub-sbp', 'rub-yoomoney', 'rub-payeer', 'rub-advcash', 'rub-pochta-bank']

paramsBizlato = []
dataSortBizlato = {}
exceptionIndicator = True

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

zeroDataBizlato = {}
for key1 in assetBizlato:
  zeroDataBizlato[key1] = {}
  for key2 in payTypesNameBizlato:
    zeroDataBizlato[key1][payTypesNameBizlato[key2]] = {}

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


# with open("bitzlatoData.json", "w") as outfile:
#   json.dump(dataSortBizlato, outfile)
# with open("bitzlatoZeroData.json", "w") as outfile:
#   json.dump(zeroDataBizlato, outfile)

while True:

  # Запросы для получения данных с Bizlato
  startTime = datetime.now()
  reqBizlato()
  endTime = datetime.now()
  print("Время затраченное на API запросы (Bizlato): " + str(endTime - startTime))
  

  with open("bitzlatoZeroData.json", "w") as outfile:
    json.dump(zeroDataBizlato, outfile)

  # # Расчёт связок Bizlato и оиправка их в БД
  # startTime = datetime.now()
  # threads = []

  # for key in dataSortBizlato:
  #   # defaultBundles("Bizlato", dataSortBizlato, zeroDataBizlato, bizlatoDatabaseSql, key)
  #   t = Thread(target=defaultBundles, args=("Bizlato", dataSortBizlato, zeroDataBizlato, bizlatoDatabaseSql, key, ))
  #   threads.append(t)

  # for x in threads:
  #   x.start()
  # for x in threads:
  #   x.join()

  # endTime = datetime.now()
  # print("Время затраченное на MySQL запросы (Bizlato): " + str(endTime - startTime))
    
  # # Расчёт межбиржевых связок (Bizlato, Binance) и оиправка их в БД
  # startTime = datetime.now()
  # threads = []
  
  # for key in dataSortBinance:
  #   # interExchangeBundles("Binance", dataSortBinance, 'Huobi', dataSortHuobi, interExchangeDatabaseSql, key)
  #   t= Thread(target=interExchangeBundles, 
  #     args=("Binance", dataSortBinance, 'Huobi', dataSortHuobi, interExchangeDatabaseSql, key, ))
  #   threads.append(t)

  # for x in threads:
  #   x.start()
  # for x in threads:
  #   x.join()

  # endTime = datetime.now()
  # print("Время затраченное на MySQL запросы (Межиржевые Binance + Huobi): " + str(endTime - startTime))