from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer
from rest_framework.permissions import AllowAny

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]  # accessible à tous, peut-être filtré plus tard

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang', None)
        if lang:
            queryset = queryset.filter(language=lang)
        return queryset
