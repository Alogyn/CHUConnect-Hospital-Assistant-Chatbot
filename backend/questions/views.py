from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

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
