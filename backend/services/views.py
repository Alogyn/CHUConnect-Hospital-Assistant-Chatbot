from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from logs.utils import log_action

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

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
        instance = serializer.save()
        log_action(
            action_type='admin_action',
            user=self.request.user if self.request.user.is_authenticated else None,
            details=f"Service créé: {instance.name}"
        )

    def perform_update(self, serializer):
        instance = serializer.save()
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
