from rest_framework import serializers
from .models import Tarif

class TarifSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarif
        fields = ['id', 'service', 'price', 'description', 'language']
        read_only_fields = ['id']
