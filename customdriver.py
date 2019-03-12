import os
import shutil

from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver


class FirefoxProfileDriver(WebDriver):

    def __init__(self, *args, **kwargs):
        self.profile_path = kwargs['profile_path']
        if not os.path.isdir(self.profile_path):
            os.makedirs(self.profile_path)
        if self.profile_path:
            firefox_profile = webdriver.FirefoxProfile(self.profile_path)
            kwargs['firefox_profile'] = firefox_profile
            del(kwargs['profile_path'])
        super(FirefoxProfileDriver, self).__init__(*args, **kwargs)

    def quit(self):

        rust_profile_name = self.capabilities['moz:profile']
        shutil.rmtree(self.profile_path)
        shutil.copytree(rust_profile_name, self.profile_path,
                        ignore=shutil.ignore_patterns("parent.lock", "lock", ".parentlock"))
        super(FirefoxProfileDriver, self).quit()
