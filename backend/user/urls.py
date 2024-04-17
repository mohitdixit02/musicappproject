from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.login_user, name='login'),
    path('signup/', views.signup,name='signup'),
    path('getuser/',views.getUser, name='get_user'),
    path('fulluser/',views.fullUser, name='full_user'),
    path('logout/',views.logout_user, name='logout'),  
]