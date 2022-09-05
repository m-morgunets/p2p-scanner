import requests
import json
from pprint import pprint

headers = {
  'Content-Type': "application/json",
  'X-Access-Token': "123"
}

response = requests.get('https://bitpapa.com/api/v1/offers/of/miha123770214', headers=headers)

# with open('garantex.html', 'w', encoding='utf-8') as f:
#   f.write(response.text)

pprint(json.load(response.text))