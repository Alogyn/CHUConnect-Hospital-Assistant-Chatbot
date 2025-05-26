from django.test import TestCase
from .models import Question

class QuestionTestCase(TestCase):
    def setUp(self):
        Question.objects.create(text="Combien coûte l'analyse ?", language="fr")
        Question.objects.create(text="ما ثمن التحليل؟", language="ar")

    def test_question_count(self):
        self.assertEqual(Question.objects.count(), 2)

    def test_question_language(self):
        q = Question.objects.get(language="ar")
        self.assertIn("ثمن", q.text)
