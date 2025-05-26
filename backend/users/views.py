from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

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

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Log la connexion si le login a réussi
        if response.status_code == 200:
            username = request.data.get('username', None)
            log_action(
                action_type='login',
                user=username,
                details="Connexion réussie"
            )
        return response