from rest_framework import viewsets
from .models import Log
from .serializers import LogSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def by_user(self, request):
        username = request.GET.get('user')
        if not username:
            return Response({"error": "user param required"}, status=400)
        qs = self.get_queryset().filter(user=username)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
