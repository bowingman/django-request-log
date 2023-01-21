from django.contrib import admin
from django.contrib.auth.models import User


class CustomUserAdmin(admin.ModelAdmin):
    exclude = ('password', 'is_superuser', 'is_active', 'groups',
               'user_permissions', 'last_login', 'date_joined')
    list_display = ('username', 'email', 'first_name', 'last_name')


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Register your models here.
