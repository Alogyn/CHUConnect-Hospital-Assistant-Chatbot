#services/serializers.py
from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'user', 'user_name']
        read_only_fields = ['id', 'user', 'user_name']
