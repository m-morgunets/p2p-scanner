import os
import psutil

os.startfile("usdt_buy.py")
os.startfile("usdt_sell.py")
os.startfile("btc_buy.py")
os.startfile("btc_sell.py")
os.startfile("busd_buy.py")
os.startfile("busd_sell.py")
os.startfile("bnb_buy.py")
os.startfile("bnb_sell.py")
os.startfile("eth_buy.py")
os.startfile("eth_sell.py")
os.startfile("rub_buy.py")
os.startfile("rub_sell.py")
os.startfile("shib_buy.py")
os.startfile("shib_sell.py")

input()

for process in (process for process in psutil.process_iter() if process.name()=="C:\\Windows\py.exe"):
  process.kill()