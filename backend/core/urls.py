from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # Apps routes
    path('api/', include('users.urls')),
    path('api/', include('roles.urls')),
    path('api/', include('questions.urls')),
    path('api/', include('reponses.urls')),
    path('api/', include('services.urls')),
    path('api/', include('tarifs.urls')),
    path('api/', include('logs.urls')),
    path('api/', include('feedbacks.urls')),
]
