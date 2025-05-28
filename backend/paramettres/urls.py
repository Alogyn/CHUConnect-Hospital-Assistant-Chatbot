from django.urls import path
from .views import get_hospital_hours

urlpatterns = [
    path('get-hospital-hours/', get_hospital_hours),
]
