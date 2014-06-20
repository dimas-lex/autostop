# from django.contrib.auth.models import User
from tastypie.cache import SimpleCache
from tastypie import fields
from tastypie.resources import ModelResource, Resource
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

from autostop.auto.models import AUser
from autostop.auto.models import Car
from autostop.auto.models import Race

from autostop.auto.services.UserServices import AUserService

import logging,  json
logger = logging.getLogger('autostop')

class AUserResource(ModelResource):
    class Meta:
        queryset = AUser.objects.filter(is_staff=False)
        resource_name = 'user'
        excludes = ['is_active', 'is_staff', 'is_superuser']
        filtering = {
            'last_name': ALL,
        }
        authorization = Authorization()

    # def dehydrate_password(self, bundle):
    #     return ''

    # def dehydrate_email(self, bundle):
    #     if bundle.request.user.pk == bundle.obj.pk:
    #         # Note that there isn't an ``email`` field on the ``Resource``.
    #         # By this time, it doesn't matter, as the built data will no
    #         # longer be checked against the fields on the ``Resource``.
    #         return bundle.obj.email
    #     else:
    #         return bundle.obj.email[0:2] + "..."

    def get_object_list(self, request):
        logger.debug('get_object_list')
        results = AUserService().get_all()

        # results = []

        # for result in query.run():
        #     new_obj = RiakObject(initial=result[1])
        #     new_obj.uuid = result[0]
        #     results.append(new_obj)

        return results

    def obj_get_list(self, bundle, **kwargs):
        logger.debug('obj_get_list')
        # Filtering disabled for brevity...
        results = self.get_object_list(bundle.request)
        logger.debug(results)
        return results

class CarResource(ModelResource):
    class Meta:
        queryset = Car.objects.all()
        resource_name = 'car'

class RaceResource(ModelResource):
    class Meta:
        queryset = Race.objects.all()
        resource_name = 'race'
# class EntryResource(ModelResource):
#     user = fields.ForeignKey(UserResource, 'user')

#     class Meta:
#         queryset = Car.objects.all()
#         resource_name = 'entry'
#         authorization = Authorization()
#         filtering = {
#             'user': ALL_WITH_RELATIONS,
#             'pub_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
#         }


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