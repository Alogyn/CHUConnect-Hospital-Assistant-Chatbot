from rest_framework import viewsets
from .models import Tarif
from .serializers import TarifSerializer
from rest_framework.permissions import AllowAny

class TarifViewSet(viewsets.ModelViewSet):
    queryset = Tarif.objects.all()
    serializer_class = TarifSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.GET.get('lang', None)
        if lang:
            queryset = queryset.filter(language=lang)
        return queryset
