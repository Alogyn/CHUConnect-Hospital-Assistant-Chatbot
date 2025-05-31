from rest_framework import viewsets, permissions
from .models import Service
from .serializers import ServiceSerializer

# Endpoint CRUD (admin, authentification requise)
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    # Endpoint PUBLIC (lecture seule, pas d'authentification)
class PublicServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
