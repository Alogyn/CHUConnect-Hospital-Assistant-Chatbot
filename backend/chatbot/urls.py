from django.urls import path
from .views import RasaChatbotView

urlpatterns = [
    path('ask/', RasaChatbotView.as_view(), name='chatbot-ask'),
]
