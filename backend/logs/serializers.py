from rest_framework import serializers
from .models import Log

class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['id', 'action', 'timestamp', 'user', 'details']
        read_only_fields = ['id', 'timestamp']
