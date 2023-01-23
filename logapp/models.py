from django.db import models
from django.views import View


class RequestLog(models.Model):
    method = models.CharField(max_length=10)
    path = models.CharField(max_length=255)
    remote_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
