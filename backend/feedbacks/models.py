from django.db import models

class Feedback(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    note = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.note}/5: {self.text[:30]}"
