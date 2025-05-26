from django.test import TestCase
from .models import Feedback

class FeedbackTestCase(TestCase):
    def setUp(self):
        Feedback.objects.create(text="Super service", note=5)
        Feedback.objects.create(text="Peut mieux faire", note=3)

    def test_feedback_count(self):
        self.assertEqual(Feedback.objects.count(), 2)

    def test_feedback_note(self):
        fb = Feedback.objects.get(note=5)
        self.assertIn("Super", fb.text)
