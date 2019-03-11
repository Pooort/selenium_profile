import os
from customdriver import FirefoxProfileDriver

PROJECTPATH = os.path.dirname(os.path.realpath(__file__))

profile_path = os.path.join(PROJECTPATH, 'clean_profile')

geckodriver = os.path.join(PROJECTPATH, 'geckodriver')

driver = FirefoxProfileDriver(executable_path=geckodriver, profile_path=profile_path)

url = 'YOUR SITE HERE'
driver.get(url)
raw_input('Wait for authentication...')
driver.quit()
