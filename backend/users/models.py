from django.contrib.auth.models import AbstractUser
from django.db import models
from roles.models import Role

class CustomUser(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    # Ajoute d'autres champs si besoin

    def __str__(self):
        return self.username
