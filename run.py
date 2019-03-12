import os
from customdriver import FirefoxProfileDriver, CustomFirefoxProfile

PROJECTPATH = os.path.dirname(os.path.realpath(__file__))

profile_path = os.path.join(PROJECTPATH, 'test')

geckodriver = os.path.join(PROJECTPATH, 'geckodriver')

profile = CustomFirefoxProfile(profile_path)

driver = FirefoxProfileDriver(executable_path=geckodriver, firefox_profile=profile)

url = 'YOUR SITE HERE'
driver.get(url)
raw_input('Wait for authentication...')
driver.quit()
