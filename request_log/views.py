from django.views import View
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from django.shortcuts import render


class HomePageView(View):
    def get(self, request):
        return render(request, 'home.html')
