from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, PublicServiceViewSet

router = DefaultRouter()
router.register('services', ServiceViewSet, basename='services')
router.register('services_public', PublicServiceViewSet, basename='services_public')

urlpatterns = router.urls
