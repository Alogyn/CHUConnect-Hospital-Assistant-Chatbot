from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, PublicQuestionViewSet

router = DefaultRouter()
router.register('questions', QuestionViewSet, basename='questions')
router.register('questions_public', PublicQuestionViewSet, basename='questions_public')

urlpatterns = router.urls
