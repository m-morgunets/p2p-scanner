import grequests
import requests
import json
from pprint import pprint
import time

payment_method = {
  "qiwi" : "QIWI",
  "tinkoff" : "TinkoffNew",
  "Сбербанк" : "Sberbank",
  "СБП" : "SBP",
  "Райффайзен" : "RaiffeisenBankRussia",
  "Альфа-Банк" : "AlfaBank",
  "Росбанк" : "RosBank",
  "payeer" : "Payeer",
  "Binance" : "RUBfiatbalance",
  "Advcash" : "Advcash",
  "втб" : "VTBBANK",
  "мтс" : "MTSBank",
  "хоум" : "HomeCreditBank",
  "почта" : "PostBankRussia",
  "совком" : "Sovkombank",
  "ЮMoney": "YandexMoneyNew"
}

market = {
  'btcrub': 'BTC',
  'usdtrub': 'USDT',
  'ethrub': 'ETH',
}

params = {
  'direction': 'sell',
  'amount': '',
  'currency': 'rub',
  'nickname': '',
  'only_available': 'true',
  'payment_method': 'qiwi',
}

marketData = {
  'btcrub': 0,
  'usdtrub': 0,
  'ethrub': 0
}

paramsMarketGarantex = []
paramsGarantex = []
exceptionIndicator = False
dataSortGarantex = {}
zeroDataGarantex = {}

def exception_handler(request, exception):
  global exceptionIndicator
  print("Request failed")
  exceptionIndicator = False


for key in market:
  paramsMarketGarantex.append({ 'market': key })

for key in payment_method:
  paramsGarantex.append({
    'direction': 'sell',
    'amount': '',
    'currency': 'rub',
    'nickname': '',
    'only_available': 'true',
    'payment_method': key,
  })

def reqMarketGarantex():
  global exceptionIndicator
  exceptionIndicator = True

  data = (grequests.get('https://garantex.io/api/v2/trades', params=p) for p in paramsMarketGarantex)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    for key in result:
      try:
        dataJson = json.loads(key.text)
        market = dataJson[0]['market']
        marketData[market] = dataJson[0]['price']
      except:
        print(key.status_code)


def checkSortDataGarantex(minLimit, data, asset, payTypes):
  global dataSortBinance

  for item in data["data"]:
    minLimitData = int(item["adv"]["minSingleTransAmount"][:-3])
    maxLimitData = int(item["adv"]["dynamicMaxSingleTransAmount"][:-3])

    if ((minLimit >= minLimitData) and (minLimit <= maxLimitData)):
      dataSortGarantex[minLimit][asset][payTypes]["price"] = item["adv"]["price"]
      dataSortGarantex[minLimit][asset][payTypes]["interval"] = (str(minLimitData) + " - " + str(maxLimitData))
      return
    
  dataSortGarantex[minLimit][asset][payTypes]["price"] = 0

def sortDataGarantex(data, asset, payTypes):
  try:
    zeroDataGarantex[asset][payTypes]["price"] = data["data"][0]["adv"]["price"]
  except:
    try:
      zeroDataGarantex[asset][payTypes]["price"] = data["data"][1]["adv"]["price"]
    except:
      zeroDataGarantex[asset][payTypes]["price"] = 0

  minLimit = 5000
  checkSortDataBinance(minLimit ,data, asset, payTypes)

  for minLimit in range(10000, 310000, 10000):
    checkSortDataBinance(minLimit, data, asset, payTypes)


def reqGarantex():
  global exceptionIndicator
  exceptionIndicator = True

  data = (grequests.get('https://garantex.io/api/v2/otc/ads', params=p) for p in paramsGarantex)
  result = grequests.map(data, exception_handler=exception_handler)

  if (exceptionIndicator):
    for key in result:
      try:
        dataJson = json.loads(key.text)
        with open('garantex.json', 'w', encoding='utf-8') as outfile:
          json.dump(dataJson, outfile, ensure_ascii=False)
      except:
        print(key.status_code)

response = requests.get('https://garantex.io/api/v2/otc/ads', params=params)
# response = requests.get('https://garantex.io/api/v2/trades', params=params)

# pprint(response.text)

# with open("garantex.json", "w") as outfile:
#   json.dump(response.text, outfile)

while True:
  reqMarketGarantex()
  reqGarantex()
  pprint("Finish")

  time.sleep(40)

# with open('garantex.json', 'w', encoding='utf-8') as f:
#   f.write(str(marketData))
