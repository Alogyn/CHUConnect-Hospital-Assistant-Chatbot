from django.db import models

class Log(models.Model):
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=100, blank=True, null=True)
    details = models.TextField(blank=True)

    def __str__(self):
        return f"{self.timestamp}: {self.action}"
