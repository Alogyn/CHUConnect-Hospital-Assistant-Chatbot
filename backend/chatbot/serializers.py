from rest_framework import serializers

class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField()
    sender = serializers.CharField(required=False, default="anonymous")
    language = serializers.CharField(required=False, default="fr")
