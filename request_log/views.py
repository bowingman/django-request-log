from django.views import View
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from django.shortcuts import render


class HomePageView(View):
    def get(self, request):
        page_size = request.GET.get('page_size', 10)
        page = request.GET.get('page', 1)
        users = User.objects.all()
        paginator = Paginator(users, page_size)
        users = paginator.get_page(page)
        context = {'users': users, 'paginator': paginator}
        return render(request, 'home.html', context)
