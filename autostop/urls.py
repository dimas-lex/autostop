import logging

from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()
from tastypie.api import Api

from autostop.auto.api.resources import AUserResource, CarResource, RaceResource
from autostop.auto.views import *

from autostop.auto.models import AUser
# import os
# BASE_DIR = os.path.dirname(os.path.dirname(__file__))
logger = logging.getLogger('autostop')
# logger.debug(os.path.join(BASE_DIR, "autostop/static"))

v1_api = Api(api_name='v1')
v1_api.register(AUserResource())
v1_api.register(CarResource())
v1_api.register(RaceResource())


urlpatterns = patterns('',
    # (r'^api/', include(v1_api.urls)),
    (r'^api/', include(v1_api.urls)),
    url(r'test', get_index_page),
    url(r'\w*', get_index_page),
)

# # from auto.models import AUser
# AUser.objects.create( first_name="Sasha", last_name="Div", email="sadiv@ya.ru", password="empty", gender=False, is_driver=False)
