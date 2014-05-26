import os
import sys
sys.path.append('/home/yana/code/autostop')
os.environ['DJANGO_SETTINGS_MODULE'] = 'autostop.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
