from django.db import models
from questions.models import Question

class Reponse(models.Model):
    question = models.ForeignKey(Question, related_name='reponses', on_delete=models.CASCADE)
    text = models.TextField()
    language = models.CharField(max_length=10, choices=(('fr','Français'),('ar','Arabe')))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
