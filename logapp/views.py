from django.views import View
from django.shortcuts import render
from .models import RequestLog


class LogView(View):
    def get(self, request):
        logs = RequestLog.objects.all()
        return render(request, 'logs.html', {'logs': logs})
