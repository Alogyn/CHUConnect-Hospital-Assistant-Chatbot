from rest_framework.routers import DefaultRouter
from .views import ReponseViewSet, PublicReponseViewSet

router = DefaultRouter()
router.register('reponses', ReponseViewSet, basename='reponses')
router.register('reponses_public', PublicReponseViewSet, basename='reponses_public')

urlpatterns = router.urls
