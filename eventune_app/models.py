from __future__ import unicode_literals
from django.db import models
from datetime import date, datetime
import re

class UserManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        if (len(postData['f_name']) == 0) or (len(postData['l_name']) == 1) or (len(postData['email']) == 0):
            errors["blank"] = "All fields are required and must not be blank!"
        if len(postData['f_name']) < 2:
            errors['f_name'] = 'First Name should be at least 2 characters long'
        if len(postData['l_name']) < 2:
            errors['l_name'] = 'Last Name should be at least 2 characters long'
        if len(postData['city']) < 3:
            errors['city'] = 'City should be at least 3 characters long'
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not EMAIL_REGEX.match(postData['email']):             
            errors['email'] = "Invalid email address!"
        if len(postData["password"]) < 6:
            errors["password"] = "Password too short"
        if postData['password'] != postData['password_confirm']:
            errors["password"] = "Passwords dont match"
        return errors

class InfoManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        if (len(postData['f_name']) == 0) or (len(postData['l_name']) == 1) or (len(postData['email']) == 0):
            errors["blank"] = "All fields are required and must not be blank!"
        if len(postData['f_name']) < 2:
            errors['f_name'] = 'First Name should be at least 2 characters long'
        if len(postData['l_name']) < 2:
            errors['l_name'] = 'Last Name should be at least 2 characters long'
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if not EMAIL_REGEX.match(postData['email']):             
            errors['email'] = "Invalid email address!"
        if len(postData['city']) < 3:
            errors['city'] = 'City should be at least 3 characters long'
        return errors

class PwManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        if len(postData["password"]) < 6:
            errors["password"] = "Password too short"
        if postData['password'] != postData['password_confirm']:
            errors["password"] = "Passwords dont match"
        return errors

class User(models.Model):
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    profile_image = models.TextField(default='some profile pic')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
    obj_info = InfoManager()
    obj_pw = PwManager()

class Event(models.Model):
    api_id = models.CharField(max_length=255, default=None)
    title = models.TextField()
    date = models.CharField(max_length=255)
    users = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE)
    more_info = models.TextField(default='more info')
    picture = models.TextField(default='some picture')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)