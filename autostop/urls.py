from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()


from tastypie.api import Api
from auto.api.resources import AUserResource, CarResource, RaceResource

v1_api = Api(api_name='v1')
v1_api.register(AUserResource())
v1_api.register(CarResource())
v1_api.register(RaceResource())


urlpatterns = patterns('',
    # (r'^api/', include(v1_api.urls)),
    (r'^api/', include(v1_api.urls)),
)


from auto.models import AUser
AUser.objects.create( username="lion_k", first_name="Ivan", last_name="Petrovich", email="test@ya.ru", password="empty")
