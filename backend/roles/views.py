from rest_framework import viewsets
from .models import Role
from .serializers import RoleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from users.models import CustomUser
from users.serializers import CustomUserSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def users(self, request, pk=None):
        role = self.get_object()
        users = CustomUser.objects.filter(role=role)
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)
