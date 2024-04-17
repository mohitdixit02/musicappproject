from django.db import models


class Song(models.Model):
    name = models.CharField(max_length=80)
    artist = models.CharField(max_length=50)
    album = models.CharField(max_length=30, default='SINGLE')
    genere = models.CharField(max_length=30)
    plays = models.IntegerField(default=547809)
    length = models.IntegerField
    song_img = models.ImageField(upload_to='song/media', default='')
    song_source = models.FileField(upload_to='song/media', default='')
    duration = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=80)
    monthly_listeners = models.IntegerField(default=48494894)
    about = models.CharField(default='',max_length=8000)
    artist_img = models.ImageField(upload_to='song/media/artist', default='')
    about_img = models.ImageField(upload_to='song/media/artist', default='')
    def __str__(self):
        return self.name
