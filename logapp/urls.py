from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.LogView.as_view(), name="log"),
]
