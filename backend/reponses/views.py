from rest_framework import viewsets
from .models import Reponse
from .serializers import ReponseSerializer
from rest_framework.permissions import AllowAny

class ReponseViewSet(viewsets.ModelViewSet):
    queryset = Reponse.objects.all()
    serializer_class = ReponseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang', None)
        if lang:
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
