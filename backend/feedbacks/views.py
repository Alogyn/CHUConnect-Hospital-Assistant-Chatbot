from rest_framework import viewsets
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def min_note(self, request):
        note = int(request.GET.get('note', 0))
        qs = self.get_queryset().filter(note__gte=note)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
