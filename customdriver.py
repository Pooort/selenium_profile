import os
import shutil

from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver


class FirefoxProfileDriver(WebDriver):
    profile_path = None
    before_temp_dirs = None
    TMPDIR = '/tmp'

    def __init__(self, *args, **kwargs):
        self.profile_path = kwargs.get('profile_path')
        if self.profile_path:
            firefox_profile = webdriver.FirefoxProfile(self.profile_path)
            kwargs['firefox_profile'] = firefox_profile
            del(kwargs['profile_path'])
        super(FirefoxProfileDriver, self).__init__(*args, **kwargs)

    def quit(self):

        rust_profile_name = self.capabilities['moz:profile']
        shutil.rmtree(self.profile_path)

        shutil.copytree(os.path.join(self.TMPDIR, rust_profile_name), self.profile_path,
                        ignore=shutil.ignore_patterns("parent.lock", "lock", ".parentlock"))
        super(FirefoxProfileDriver, self).quit()
