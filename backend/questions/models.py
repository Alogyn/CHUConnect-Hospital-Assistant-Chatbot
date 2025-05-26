from django.db import models

class Question(models.Model):
    text = models.CharField(max_length=255)
    language = models.CharField(max_length=10, choices=(('fr','Français'),('ar','Arabe')))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
