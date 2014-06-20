
from django.db import models
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import date
from django.core.validators import MaxValueValidator, MinValueValidator
from phonenumber_field.modelfields import PhoneNumberField

from PIL import Image
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile

class AUser(AbstractBaseUser, PermissionsMixin):
    """
    AUser - User model with a full-length email field as the username.
            Email and password are required. Other fields are optional.
    """
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    email = models.EmailField(_('user email address'), max_length=254, unique=True)

    age = models.SmallIntegerField(blank=True, null=True, default=25, verbose_name="user age",
                                    validators=[MinValueValidator(14),
                                                MaxValueValidator(120)])
    gender = models.NullBooleanField(blank=True, null=True, default=True) # true - man, false - woman
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_active = models.BooleanField(_('active'), default=False)
    is_driver = models.BooleanField(_('active'), default=True)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    appreciation = models.SmallIntegerField(blank=True, null=True, default=4, verbose_name="driver's rating ",
                                    validators=[MinValueValidator(-10),
                                                MaxValueValidator(5000)])
    first_phone = PhoneNumberField()
    second_phone = PhoneNumberField()
    avatar_id = models.CharField(_('avatar'), max_length=300, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_absolute_url(self):
        return "/users/%s/" % urlquote(self.email)

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def email_user(self, subject, message, from_email=None):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email])

# class Images(models.Model):
#     title = models.CharField(max_length = 100)
#     image = models.ImageField(upload_to ="photos/originals/%Y/%m/")
#     image_height = models.IntegerField()
#     image_width = models.IntegerField()
#     thumbnail = models.ImageField(upload_to="photos/thumbs/%Y/%m/")
#     thumbnail_height = models.IntegerField()
#     thumbnail_width = models.IntegerField()
#     caption = models.CharField(max_length = 250, blank =True)

#     def __str__(self):
#         return "%s"%self.title

#     def __unicode__(self):
#         return self.title

#     def save(self, force_update=False, force_insert=False, thumb_size=(180,300)):

#         image = Image.open(self.image)

#         if image.mode not in ('L', 'RGB'):
#             image = image.convert('RGB')

#         # save the original size
#         self.image_width, self.image_height = image.size

#         image.thumbnail(thumb_size, Image.ANTIALIAS)

#         # save the thumbnail to memory
#         temp_handle = StringIO()
#         image.save(temp_handle, 'png')
#         temp_handle.seek(0) # rewind the file

#         # save to the thumbnail field
#         suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
#                                  temp_handle.read(),
#                                  content_type='image/png')
#         self.thumbnail.save(suf.name+'.png', suf, save=False)
#         self.thumbnail_width, self.thumbnail_height = image.size

#         # save the image object
#         super(Images, self).save(force_update, force_insert)

class Car(models.Model):
    """
    Car - A model which describes user's car. seats field is required
    """
    owner = models.ForeignKey(AUser, related_name='cars')
    manufacturer = models.CharField(_('brand name'), max_length=255)
    model = models.CharField(max_length=255)
    year = models.SmallIntegerField(blank=True, null=True, default=2014, verbose_name="year of cars construction",
                                    validators=[MinValueValidator(1970),
                                                MaxValueValidator(date.today().year + 1) ])

    notes = models.TextField(blank=True, null=True, verbose_name="field for notes")
    seats = models.SmallIntegerField(blank=False, null=False, default=4, verbose_name="available seats with driver", help_text="",
                                    validators=[MinValueValidator(2),
                                                MaxValueValidator(50)])
class City(models.Model):
    """
    City -
    """
    name = models.CharField(_('city name'), max_length=255)
    latitude = models.FloatField(blank=True, null=True,   verbose_name="latitude of the city")
    longtitude = models.FloatField(blank=True, null=True,   verbose_name="longtitude of the city")


class Race(models.Model):
    """
    Race - A one race which was created and driven by car's owner
    """
    owner = models.ForeignKey(AUser, related_name='races')
    car = models.ForeignKey(Car, related_name='races')
    date_time =  models.DateTimeField()
    all_available_seats = models.SmallIntegerField(blank=False, null=False, default=4, verbose_name="available seats with driver", help_text="",
                                    validators=[MinValueValidator(2),
                                                MaxValueValidator(50)])
    left_available_seats = models.SmallIntegerField(blank=False, null=False, default=4, verbose_name="left seats", help_text="",
                                    validators=[MinValueValidator(2),
                                                MaxValueValidator(50)])

    city_from = models.ForeignKey(City)
    city_to = models.ForeignKey(City)

    completed = models.BooleanField(_('active'), default=True)
    follower = models.ForeignKey(AUser, related_name='trips')