from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.permissions import AllowAny

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang', None)
        if lang:
            queryset = queryset.filter(language=lang)
        return queryset

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.GET.get('q', '')
        qs = self.get_queryset().filter(name__icontains=query)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
