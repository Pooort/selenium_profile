import os
import time
import tqdm

from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from customdriver import CustomFirefoxProfile, FirefoxProfileDriver

PROJECTPATH = os.path.dirname(os.path.realpath(__file__))

profile_path = os.path.join(PROJECTPATH, 'test')
geckodriver = os.path.join(PROJECTPATH, 'geckodriver')

url = 'https://examples.sencha.com/extjs/6.7.0/examples/admin-dashboard/#dashboard'


def wait_and_quit(driver):
    try:
        iframe = driver.find_element_by_id('examples-iframe')
        driver.switch_to.frame(iframe)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'todo-1074_header-title-textEl')))
    finally:
        driver.quit()


def common_driver_test():
    driver = WebDriver(executable_path=geckodriver)
    driver.get(url)
    wait_and_quit(driver)


def custom_driver_test():
    profile = CustomFirefoxProfile(profile_path)
    driver = FirefoxProfileDriver(executable_path=geckodriver, firefox_profile=profile)
    driver.get(url)
    wait_and_quit(driver)


n = 20
custom_driver_test()
bar = tqdm.tqdm(total=n*2)

start_common = time.time()
for _ in range(n):
    bar.update()
    common_driver_test()
end_common = time.time()
duration_common = end_common - start_common
print('Common Duration: {}'.format(duration_common))

start_custom = time.time()
for _ in range(n):
    bar.update()
    custom_driver_test()
end_custom = time.time()
duration_custom = end_custom - start_custom


print('Site: {}'.format(url))
ratio = (duration_common - duration_custom) * 100 / duration_common
print('Common: {} | Custom: {} | {:.2f}% faster'.format(duration_common, duration_custom, ratio))