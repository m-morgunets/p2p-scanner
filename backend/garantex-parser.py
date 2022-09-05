import grequests
import requests
import json
from pprint import pprint

params = {
    'utf8': '✓',
    'payment_method': 'QIWI',
    'amount': '',
    'currency': 'RUB',
    'commit': 'Поиск',
}

response = requests.get('https://garantex.io/p2p', params=params)

with open('garantex.html', 'w', encoding='utf-8') as f:
  f.write(response.text)