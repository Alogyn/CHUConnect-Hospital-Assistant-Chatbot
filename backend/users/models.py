from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    role = models.ForeignKey('roles.Role', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.username
