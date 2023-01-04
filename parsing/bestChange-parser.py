import grequests
import requests
import json
import time
from datetime import datetime
from pprint import pprint
import copy

from threading import Thread

from mysql.connector import connect, Error

from bestchange_api import BestChange

api = BestChange()
# exchangers = api.exchangers().get()
pprint(api.currencies().get())

# dir_from = 93
# dir_to = 42
# rows = api.rates().filter(dir_from, dir_to)
# title = 'Exchange rates in the direction (https://www.bestchange.ru/index.php?from={}&to={}) {} : {}'
# print(title.format(dir_from, dir_to, api.currencies().get_by_id(dir_from), api.currencies().get_by_id(dir_to)))
# for val in rows[:3]:
#     print('{} {}'.format(exchangers[val['exchange_id']]['name'], val))