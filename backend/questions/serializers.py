from rest_framework import serializers
from .models import Question
from reponses.serializers import ReponseSerializer

class QuestionSerializer(serializers.ModelSerializer):
    reponse = ReponseSerializer(read_only=True)
    auteur_email = serializers.SerializerMethodField()  # 👈 Ajoute ce champ

    class Meta:
        model = Question
        fields = '__all__'  # inclut aussi auteur_email !
        read_only_fields = ['id', 'created_at', 'user']

    def get_auteur_email(self, obj):
        return obj.user.email if obj.user else None
