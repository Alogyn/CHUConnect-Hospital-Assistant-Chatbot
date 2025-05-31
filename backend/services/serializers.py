from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Service
        fields = ('id', 'name', 'location', 'description', 'user')
        read_only_fields = ['id', 'user']
