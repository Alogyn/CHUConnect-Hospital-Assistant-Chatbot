from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from logs.utils import log_action

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang')
        if lang in ['fr', 'ar']:
            queryset = queryset.filter(language=lang)
        return queryset

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.GET.get('q', '')
        qs = self.get_queryset().filter(text__icontains=query)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def last(self, request):
        nb = int(request.GET.get('n', 10))
        qs = self.get_queryset().order_by('-created_at')[:nb]
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save()
        log_action(
            action_type='question',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Question créée: {instance.text[:30]}"
        )

    def perform_update(self, serializer):
        instance = serializer.save()
        log_action(
            action_type='question',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Question modifiée: {instance.text[:30]}"
        )

    def perform_destroy(self, instance):
        log_action(
            action_type='question',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Question supprimée: {instance.text[:30]}"
        )
        instance.delete()
