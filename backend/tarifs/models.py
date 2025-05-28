#tarifs/models.py
from django.db import models
from services.models import Service
from users.models import CustomUser

class Tarif(models.Model):
    acte = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.acte} ({self.service.name}) - {self.price} DH"