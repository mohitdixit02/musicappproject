from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('req_data/',include('song.urls')),
    path('user/', include('user.urls')),
    re_path(r'^/*', views.indexRepath, name='indexRedf'),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url = '/static/favicon.ico', permanent = True)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

