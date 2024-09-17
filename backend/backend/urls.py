from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('req_data/',include('song.urls')),
    path('user/', include('user.urls')),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url = staticfiles_storage.url('favicon.ico'))),
]

