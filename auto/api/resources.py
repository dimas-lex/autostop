# from django.contrib.auth.models import User
from tastypie.cache import SimpleCache
from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from auto.models import Driver
from auto.models import AUser
from auto.models import Car

class UserResource(ModelResource):
    class Meta:
        queryset = AUser.objects.filter(is_staff=False)
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        filtering = {
            'username': ALL,
        }


class EntryResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Car.objects.all()
        resource_name = 'entry'
        authorization = Authorization()
        filtering = {
            'user': ALL_WITH_RELATIONS,
            'pub_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }


# class UserResource(ModelResource):
#     class Meta:
#         resource_name = 'users'
#         queryset = User.objects.all()
#         authorization = Authorization()


# class CachedUserResource(ModelResource):
#     class Meta:
#         allowed_methods = ('get', )
#         queryset = User.objects.all()
#         resource_name = 'cached_users'
#         cache = SimpleCache(timeout=3600)


# class PublicCachedUserResource(ModelResource):
#     class Meta:
#         allowed_methods = ('get', )
#         queryset = User.objects.all()
#         resource_name = 'public_cached_users'
#         cache = SimpleCache(timeout=3600, public=True)


# class PrivateCachedUserResource(ModelResource):
#     class Meta:
#         allowed_methods = ('get', )
#         queryset = User.objects.all()
#         resource_name = 'private_cached_users'
#         cache = SimpleCache(timeout=3600, private=True)


# class DriverResource(ModelResource):
#     user = fields.ForeignKey(UserResource, 'user')

#     class Meta:
#         resource_name = 'drivers'
#         queryset = Driver.objects.all()
#         authorization = Authorization()


# class SessionUserResource(ModelResource):
#     class Meta:
#         resource_name = 'sessionusers'
#         queryset = User.objects.all()
#         authentication = SessionAuthentication()
#         authorization = Authorization()