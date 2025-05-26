from django.test import TestCase
from .models import CustomUser
from roles.models import Role

class CustomUserTestCase(TestCase):
    def setUp(self):
        # Crée d'abord un rôle !
        admin_role = Role.objects.create(name="Admin", description="Admin user")
        CustomUser.objects.create_user(username="user1", password="pass", email="user1@email.com", role=admin_role)
        CustomUser.objects.create_user(username="user2", password="pass", email="user2@email.com", role=admin_role)

    def test_user_count(self):
        self.assertEqual(CustomUser.objects.count(), 2)

    def test_user_str(self):
        user = CustomUser.objects.get(username="user1")
        self.assertEqual(str(user), "user1")
