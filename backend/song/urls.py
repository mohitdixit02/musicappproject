from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData, name='getdata'),
    path('<int:songid>',views.audio, name='audio_play'),
    path('artist',views.artist,name='artist_data'),
    path('artist/<str:artistname>',views.artistinfo,name='artist_info'),
    path('album/<str:album>',views.album,name='album_data'),
    path('search/<str:index>',views.search,name='search'),
    path('catg/<str:catg>',views.category,name='catg'),


    path('test_upload',views.test_upload,name='test'),
]