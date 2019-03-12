import shutil
from selenium.webdriver import FirefoxProfile
from selenium.webdriver.firefox.webdriver import WebDriver


class CustomFirefoxProfile(FirefoxProfile):
    def __init__(self, profile_directory):
        self.base_profile_directory = profile_directory
        super(CustomFirefoxProfile, self).__init__(profile_directory)


class FirefoxProfileDriver(WebDriver):

    def quit(self):

        rust_profile_name = self.capabilities['moz:profile']
        shutil.rmtree(self.firefox_profile.base_profile_directory)
        shutil.copytree(rust_profile_name, self.firefox_profile.base_profile_directory,
                        ignore=shutil.ignore_patterns("parent.lock", "lock", ".parentlock"))
        super(FirefoxProfileDriver, self).quit()
