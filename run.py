import os

from selenium import webdriver

file_path = os.path.dirname(os.path.realpath(__file__))
geckodriver = os.path.join(file_path, 'geckodriver')
#driver = webdriver.Firefox(executable_path=geckodriver)
#chromedriver = os.path.join(file_path, 'chromedriver')
#driver = webdriver.Chrome(executable_path=chromedriver)
#driver.get('http://ya.ru')

profile_path = '/home/port/.mozilla/firefox/pygnrrsb.test'
profile = webdriver.FirefoxProfile(profile_path)
driver = webdriver.Firefox(executable_path=geckodriver, firefox_profile=profile)
#driver = webdriver.Firefox()

driver.get('https://tesera.ru/')

print('!')