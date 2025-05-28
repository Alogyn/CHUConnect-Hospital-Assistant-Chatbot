#tarifs/view.py
from rest_framework import viewsets
from .models import Tarif
from .serializers import TarifSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from logs.utils import log_action

class TarifViewSet(viewsets.ModelViewSet):
    queryset = Tarif.objects.all()
    serializer_class = TarifSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Lecture publique, ajout/modif/suppression = connexion requise

    def get_queryset(self):
        queryset = super().get_queryset()
        service = self.request.GET.get('service')
        if service:
            queryset = queryset.filter(service__name__icontains=service)
        return queryset

    @action(detail=False, methods=['get'])
    def by_service(self, request):
        service_name = request.GET.get('service')
        if not service_name:
            return Response({"error": "service param required"}, status=400)
        qs = self.get_queryset().filter(service__name__icontains=service_name)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # On ajoute automatiquement le user connecté
        instance = serializer.save(user=self.request.user)
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Tarif créé: {instance.service.name} - {instance.price} DH"
        )

    def perform_update(self, serializer):
        # Optionnel : on peut aussi mettre à jour l'user si tu veux, sinon retire l'argument user
        instance = serializer.save(user=self.request.user)
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Tarif modifié: {instance.service.name} - {instance.price} DH"
        )

    def perform_destroy(self, instance):
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Tarif supprimé: {instance.service.name} - {instance.price} DH"
        )
        instance.delete()
