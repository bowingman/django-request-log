from django.views import View
from django.contrib.auth.models import User
from django.shortcuts import render


class HomePageView(View):
    def get(self, request):
        users = User.objects.all()

        return render(request, 'home.html', {'users': users})
