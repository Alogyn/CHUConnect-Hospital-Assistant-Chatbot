#tarifs/serializers.py
from rest_framework import serializers
from .models import Tarif

class TarifSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Tarif
        fields = ['id', 'acte', 'price', 'user', 'user_name', 'service', 'service_name']
        read_only_fields = ['id', 'user', 'user_name', 'service_name']

