from django.test import TestCase
from services.models import Service
from .models import Tarif

class TarifTestCase(TestCase):
    def setUp(self):
        service = Service.objects.create(name="Radio", description="Desc", language="fr")
        Tarif.objects.create(service=service, price=200, description="Tarif radio", language="fr")

    def test_tarif_count(self):
        self.assertEqual(Tarif.objects.count(), 1)

    def test_tarif_service(self):
        t = Tarif.objects.first()
        self.assertEqual(t.service.name, "Radio")
