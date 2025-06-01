from rest_framework import serializers
from .models import Reponse

class ReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reponse
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'user']
