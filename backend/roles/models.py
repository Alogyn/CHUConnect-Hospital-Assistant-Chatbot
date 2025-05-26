from django.db import models

class Log(models.Model):
    ACTION_TYPE_CHOICES = [
        ('question', 'Question posée'),
        ('feedback', 'Feedback soumis'),
        ('admin_action', 'Action admin'),
        ('login', 'Connexion'),
        ('logout', 'Déconnexion'),
    ]

    action = models.CharField(max_length=255, choices=ACTION_TYPE_CHOICES)
    user = models.CharField(max_length=100, blank=True, null=True)  # username ou 'anonymous'
    details = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.timestamp} - {self.action} ({self.user})"
