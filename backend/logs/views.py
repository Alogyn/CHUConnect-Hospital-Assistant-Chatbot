from rest_framework import viewsets
from .models import Log
from .serializers import LogSerializer
from rest_framework.permissions import IsAuthenticated

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]
