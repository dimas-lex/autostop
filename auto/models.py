
from django.db import models
from django.utils import timezone
from django.utils.http import urlquote
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import date
from django.core.validators import MaxValueValidator, MinValueValidator

class AUser(AbstractBaseUser, PermissionsMixin):
    """
    AUser - User model with a full-length email field as the username.
            Email and password are required. Other fields are optional.
    """
    email = models.EmailField(_('user email address'), max_length=254, unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
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


class Car(models.Model):
    """
    Car - A model which describes user's car. seats field is required
    """
    owner = models.ForeignKey(AUser, related_name='cars')
    manufacturer = models.CharField(max_length=255)
    year_manufacter = models.SmallIntegerField(blank=True, null=True, default=2014, verbose_name="year of cars construction",
                                    validators=[MinValueValidator(1970),
                                                MaxValueValidator(date.today().year + 1) ])
    car_model = models.CharField(max_length=255)
    notes = models.TextField(blank=True, null=True, verbose_name="field for notes")
    seats = models.SmallIntegerField(blank=False, null=False, default=4, verbose_name="available seats with driver", help_text="",
                                    validators=[MinValueValidator(2),
                                                MaxValueValidator(50)])

