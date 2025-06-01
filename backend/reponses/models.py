from django.db import models
from django.conf import settings

class Reponse(models.Model):
    answer_text = models.TextField()
    question = models.OneToOneField(
        'questions.Question',  # référence à l'autre app
        on_delete=models.CASCADE,
        related_name="reponse"  # permet question.reponse
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Réponse à : {self.question.user_input[:40]}"
