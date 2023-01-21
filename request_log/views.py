from django.views import View
from django.shortcuts import render


class HomePageView(View):
    def get(self, request):
        context = {
            'title': "Welcome To Home Page!",
            "message": "This is my First Home Page!",
        }

        return render(request, 'home.html', context)
