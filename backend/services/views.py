#services/views.py
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from logs.utils import log_action
from tarifs.models import Tarif
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang')
        if lang in ['fr', 'ar']:
            queryset = queryset.filter(language=lang)
        return queryset

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.GET.get('q', '')
        qs = self.get_queryset().filter(name__icontains=query)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Service créé: {instance.name}"
        )

    def perform_update(self, serializer):
        instance = serializer.save(user=self.request.user)
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Service modifié: {instance.name}"
        )

    def perform_destroy(self, instance):
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Service supprimé: {instance.name}"
        )
        instance.delete()

    @action(detail=False, methods=['get'], url_path='tarif')
    def tarif_by_service(self, request):
        """
        Endpoint : /api/services/tarif/?service=nom
        """
        service_name = request.GET.get('service')
        if not service_name:
            return Response({"error": "Nom de service manquant"}, status=400)
        try:
            service = Service.objects.get(name__iexact=service_name)
            # Si plusieurs tarifs par service, utilise filter() puis .first() ou adapte à ton modèle
            tarif = Tarif.objects.filter(service=service).first()
            if not tarif:
                return Response({"error": "Tarif non renseigné pour ce service"}, status=404)
            return Response({
                "service": service.name,
                "prix": float(tarif.prix)  # Adapte selon le champ de ta table
            })
        except Service.DoesNotExist:
            return Response({"error": "Service introuvable"}, status=404)