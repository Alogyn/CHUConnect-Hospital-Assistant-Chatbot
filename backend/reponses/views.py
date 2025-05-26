from rest_framework import viewsets
from .models import Reponse
from .serializers import ReponseSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from logs.utils import log_action

class ReponseViewSet(viewsets.ModelViewSet):
    queryset = Reponse.objects.all()
    serializer_class = ReponseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang')
        if lang in ['fr', 'ar']:
            queryset = queryset.filter(language=lang)
        return queryset

    @action(detail=False, methods=['get'])
    def by_question(self, request):
        question_id = request.GET.get('question_id')
        if not question_id:
            return Response({"error": "question_id param required"}, status=400)
        qs = self.get_queryset().filter(question__id=question_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save()
        log_action(
            action_type='admin_action',  # ou "reponse"
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Réponse créée à la question {instance.question_id}"
        )

    def perform_update(self, serializer):
        instance = serializer.save()
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Réponse modifiée: {instance.text[:30]}"
        )

    def perform_destroy(self, instance):
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Réponse supprimée: {instance.text[:30]}"
        )
        instance.delete()
