from django.db import models

class Tarif(models.Model):
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    language = models.CharField(max_length=10, choices=(('fr','Français'),('ar','Arabe')))

    def __str__(self):
        return f"{self.service.name} - {self.price} DH"
