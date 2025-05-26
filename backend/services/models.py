from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    language = models.CharField(max_length=10, choices=(('fr','Français'),('ar','Arabe')))

    def __str__(self):
        return self.name
