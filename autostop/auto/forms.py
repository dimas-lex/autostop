# -*- coding: utf-8 -*-
from django import forms
from autostop.auto.models import AUser

class AUserForm(forms.Form):
    class Meta:
        model = AUser