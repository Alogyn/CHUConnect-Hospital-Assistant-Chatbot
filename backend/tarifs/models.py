from django.db import models
from django.conf import settings

class Tarif(models.Model):
    acte = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.acte
