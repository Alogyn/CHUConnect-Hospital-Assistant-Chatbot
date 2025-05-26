from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def by_role(self, request):
        role_name = request.GET.get('role')
        if not role_name:
            return Response({"error": "role param required"}, status=400)
        users = self.queryset.filter(role__name=role_name)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
