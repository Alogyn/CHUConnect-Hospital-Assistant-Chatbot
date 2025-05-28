#tarifs/urls.py
from rest_framework.routers import DefaultRouter
from .views import TarifViewSet

router = DefaultRouter()
router.register(r'', TarifViewSet, basename='tarif')

urlpatterns = router.urls
