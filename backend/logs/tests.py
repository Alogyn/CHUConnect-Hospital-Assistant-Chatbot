from django.test import TestCase
from .models import Log

class LogTestCase(TestCase):
    def setUp(self):
        Log.objects.create(action="question", user="testuser", details="Test question action")

    def test_log_count(self):
        self.assertEqual(Log.objects.count(), 1)

    def test_log_str(self):
        log = Log.objects.first()
        self.assertIn("question", str(log))
