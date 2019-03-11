import os

from pip._vendor.distlib._backport import shutil
from selenium import webdriver

PROJECTPATH = os.path.dirname(os.path.realpath(__file__))
TMPDIR = '/tmp'

profile_path = os.path.join(PROJECTPATH, 'clean_profile')
firefox_profile = webdriver.FirefoxProfile(profile_path)

before_temp_dirs = [el for el in os.listdir(TMPDIR) if os.path.isdir(os.path.join(TMPDIR, el))]

geckodriver = os.path.join(PROJECTPATH, 'geckodriver')
driver = webdriver.Firefox(executable_path=geckodriver, firefox_profile=firefox_profile)
url = 'https://tesera.ru'
driver.get(url)

# replace current profile with authenticated profile
after_temp_dirs = [el for el in os.listdir(TMPDIR) if os.path.isdir(os.path.join(TMPDIR, el))]
rust_profile_names = [el for el in after_temp_dirs if el not in before_temp_dirs and 'rust_mozprofile' in el]
if len(rust_profile_names) > 1:
    print("WARNING!!! More than one profile!")
else:
    rust_profile_name = rust_profile_names[0]

shutil.rmtree(profile_path)

shutil.copytree(os.path.join(TMPDIR, rust_profile_name), profile_path,
                ignore=shutil.ignore_patterns("parent.lock", "lock", ".parentlock"))
driver.quit()
