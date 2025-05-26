from django.test import TestCase
from .models import Service

class ServiceTestCase(TestCase):
    def setUp(self):
        Service.objects.create(name="Radiologie", description="Service radio", language="fr")
        Service.objects.create(name="تحاليل", description="خدمة التحاليل", language="ar")

    def test_service_count(self):
        self.assertEqual(Service.objects.count(), 2)

    def test_service_str(self):
        s = Service.objects.get(language="fr")
        self.assertEqual(str(s), "Radiologie")
