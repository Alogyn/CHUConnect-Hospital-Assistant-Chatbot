from django.test import TestCase
from questions.models import Question
from .models import Reponse

class ReponseTestCase(TestCase):
    def setUp(self):
        q = Question.objects.create(text="Quel est le tarif ?", language="fr")
        Reponse.objects.create(question=q, text="Le tarif est de 100DH.", language="fr")

    def test_reponse_count(self):
        self.assertEqual(Reponse.objects.count(), 1)

    def test_reponse_question(self):
        r = Reponse.objects.first()
        self.assertEqual(r.question.text, "Quel est le tarif ?")
