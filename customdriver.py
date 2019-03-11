import os
import shutil

from selenium import webdriver
from selenium.webdriver.firefox.webdriver import WebDriver


class FirefoxProfile(WebDriver):
    profile_path = None
    before_temp_dirs = None
    TMPDIR = '/tmp'
    before_temp_dirs = None

    def __init__(self, *args, **kwargs):
        self.profile_path = kwargs.get('profile_path')
        if self.profile_path:
            firefox_profile = webdriver.FirefoxProfile(self.profile_path)

            self.before_temp_dirs = [el for el in os.listdir(self.TMPDIR) if
                            os.path.isdir(os.path.join(self.TMPDIR, el))]
            kwargs['firefox_profile'] = firefox_profile
            del(kwargs['profile_path'])
        super(FirefoxProfile, self).__init__(*args, **kwargs)

    def quit(self):
        after_temp_dirs = [el for el in os.listdir(self.TMPDIR) if
                           os.path.isdir(os.path.join(self.TMPDIR, el))]
        rust_profile_names = [el for el in after_temp_dirs if
                              el not in self.before_temp_dirs and 'rust_mozprofile' in el]
        if len(rust_profile_names) > 1:
            raise Exception('Too many temp profieles!')
        else:
            rust_profile_name = rust_profile_names[0]

        shutil.rmtree(self.profile_path)

        shutil.copytree(os.path.join(self.TMPDIR, rust_profile_name), self.profile_path,
                        ignore=shutil.ignore_patterns("parent.lock", "lock", ".parentlock"))
        super(FirefoxProfile, self).quit()
