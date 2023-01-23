from django.views import View
from django.shortcuts import render
from django.core.paginator import Paginator
from .models import RequestLog


class LogView(View):
    def get(self, request):
        page_size = request.GET.get('page_size', 10)
        page = request.GET.get('page', 1)
        logs = RequestLog.objects.all().order_by('-timestamp')
        paginator = Paginator(logs, page_size)
        logs = paginator.get_page(page)
        context = {'logs': logs, 'paginator': paginator}
        return render(request, 'logs.html', context)
