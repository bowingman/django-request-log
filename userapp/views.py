from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .serializers import UserSerializer


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomPageNumberPagination
