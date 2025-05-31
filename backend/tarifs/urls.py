from rest_framework.routers import DefaultRouter
from .views import TarifViewSet, PublicTarifViewSet

router = DefaultRouter()
router.register('tarifs', TarifViewSet, basename='tarifs')
router.register('tarifs_public', PublicTarifViewSet, basename='tarifs_public')

urlpatterns = router.urls
