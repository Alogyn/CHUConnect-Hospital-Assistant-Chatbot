from rest_framework import viewsets, permissions
from .models import Tarif
from .serializers import TarifSerializer

# Endpoint CRUD (admin, authentification requise)
class TarifViewSet(viewsets.ModelViewSet):
    queryset = Tarif.objects.all()
    serializer_class = TarifSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

# Endpoint PUBLIC (lecture seule, pas d'authentification)
class PublicTarifViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tarif.objects.all()
    serializer_class = TarifSerializer
    permission_classes = [permissions.AllowAny]
