from django.db import models
from django.conf import settings

class Question(models.Model):
    user_input = models.TextField()
    categorie = models.CharField(max_length=100)  # Champ texte pour la catégorie
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_input[:50]}..."
