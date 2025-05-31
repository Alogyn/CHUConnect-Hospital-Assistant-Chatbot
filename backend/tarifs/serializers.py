from rest_framework import serializers
from .models import Tarif

class TarifSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Tarif
        fields = ('id', 'acte', 'price', 'user')
        read_only_fields = ['id', 'user']
