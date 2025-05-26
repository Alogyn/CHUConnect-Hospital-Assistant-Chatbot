from django.test import TestCase
from .models import Role

class RoleTestCase(TestCase):
    def setUp(self):
        Role.objects.create(name="Admin", description="Admin user")
        Role.objects.create(name="SuperAdmin", description="Super admin user")

    def test_role_count(self):
        self.assertEqual(Role.objects.count(), 2)

    def test_role_str(self):
        role = Role.objects.get(name="Admin")
        self.assertEqual(str(role), "Admin")
