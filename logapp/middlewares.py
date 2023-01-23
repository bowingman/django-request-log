import logging
from datetime import datetime
from .models import RequestLog


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger(__name__)

    def __call__(self, request):
        if '/api/' in request.path or '/home/' in request.path:
            RequestLog.objects.create(
                method=request.method,
                path=request.path,
                remote_address=request.META["REMOTE_ADDR"],
                timestamp=datetime.now()
            )
        response = self.get_response(request)
        return response
