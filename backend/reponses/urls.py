from rest_framework.routers import DefaultRouter
from .views import ReponseViewSet

router = DefaultRouter()
router.register(r'reponses', ReponseViewSet)

urlpatterns = router.urls
