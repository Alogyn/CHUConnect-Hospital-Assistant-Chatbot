from rest_framework import viewsets
from .models import Tarif
from .serializers import TarifSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

class TarifViewSet(viewsets.ModelViewSet):
    queryset = Tarif.objects.all()
    serializer_class = TarifSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang')
        if lang in ['fr', 'ar']:
            queryset = queryset.filter(language=lang)
        return queryset

    @action(detail=False, methods=['get'])
    def by_service(self, request):
        service_id = request.GET.get('service_id')
        if not service_id:
            return Response({"error": "service_id param required"}, status=400)
        qs = self.get_queryset().filter(service__id=service_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
