# -*- coding: utf-8 -*-
import unittest
from django.test import TestCase
from auto.models import AUser

class AccountServiceTest(TestCase):
    def setUp(self):

        AUser.objects.create( username="lion", first_name="Ivan", last_name="Petrovich", email="test@ya.ru", password="empty")


    def test_01_get_all(self):
        """ Test 'get_all' method """
        print self.test_01_get_all.__doc__

        self.assertEqual(3, 3)


class TestRunner(TestCase):
    def setUp(self):
        suite = unittest.TestLoader().loadTestsFromTestCase(AccountServiceTest)
        unittest.TextTestRunner(verbosity=1).run(suite)

        suite = unittest.TestLoader().loadTestsFromTestCase(ServiceServiceTest)
        unittest.TextTestRunner(verbosity=2).run(suite)
