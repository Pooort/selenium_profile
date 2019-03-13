import os
from dirsync import sync
from selenium.webdriver import FirefoxProfile
from selenium.webdriver.firefox.webdriver import WebDriver


class CustomFirefoxProfile(FirefoxProfile):

    def __init__(self, profile_directory):

        if not os.path.isdir(profile_directory):
            os.makedirs(profile_directory)
        self.base_profile_directory = profile_directory
        super(CustomFirefoxProfile, self).__init__(profile_directory)


class FirefoxProfileDriver(WebDriver):

    def quit(self):

        sourcedir = self.capabilities['moz:profile']
        targetdir = self.firefox_profile.base_profile_directory
        options = {
            'create': True,
            'purge': True
        }
        sync(sourcedir, targetdir, 'sync', **options)
        super(FirefoxProfileDriver, self).quit()
