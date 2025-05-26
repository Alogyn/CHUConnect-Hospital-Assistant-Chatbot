from rest_framework.routers import DefaultRouter
from .views import TarifViewSet

router = DefaultRouter()
router.register(r'tarifs', TarifViewSet)

urlpatterns = router.urls
