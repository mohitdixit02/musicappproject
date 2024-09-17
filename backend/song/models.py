from django.db import models
from firebase_admin import storage


class Song(models.Model):
    name = models.CharField(max_length=80)
    artist = models.CharField(max_length=50)
    album = models.CharField(max_length=30, default='SINGLE')
    genere = models.CharField(max_length=30)
    plays = models.IntegerField(default=547809)
    length = models.IntegerField
    duration = models.IntegerField(default=0)

    mp3_file = models.FileField(upload_to='music/', blank=True, null=True)
    image_file = models.ImageField(upload_to='music_images/', blank=True, null=True)

    # Fields to store Firebase URLs
    firebase_mp3_url = models.URLField(max_length=512, blank=True, null=True)
    firebase_image_url = models.URLField(max_length=512, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        # Check if an MP3 file is being uploaded
        if self.mp3_file:
            # Firebase storage bucket
            bucket = storage.bucket()

            # Create a blob for the MP3 file in Firebase Storage
            blob_mp3 = bucket.blob(f'music/{self.mp3_file.name}')

            # Upload the MP3 file directly to Firebase
            blob_mp3.upload_from_file(self.mp3_file.file, content_type=self.mp3_file.file.content_type)

            # Make the MP3 file public and save its URL
            blob_mp3.make_public()
            self.firebase_mp3_url = blob_mp3.public_url

            # Prevent local storage of the MP3 file
            self.mp3_file = None

        # Check if an image file is being uploaded
        if self.image_file:
            # Firebase storage bucket
            bucket = storage.bucket()

            # Create a blob for the image file in Firebase Storage
            blob_image = bucket.blob(f'music_images/{self.image_file.name}')

            # Upload the image file directly to Firebase
            blob_image.upload_from_file(self.image_file.file, content_type=self.image_file.file.content_type)

            # Make the image file public and save its URL
            blob_image.make_public()
            self.firebase_image_url = blob_image.public_url

            # Prevent local storage of the image file
            self.image_file = None

        # Call the parent class's save method
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=80)
    monthly_listeners = models.IntegerField(default=48494894)
    about = models.CharField(default='',max_length=8000)

    artist_image = models.ImageField(upload_to='artist/', blank=True, null=True)
    about_image = models.ImageField(upload_to='artist_about/', blank=True, null=True)

    # Fields to store Firebase URLs
    firebase_artist_image_url = models.URLField(max_length=512, blank=True, null=True)
    firebase_about_image_url = models.URLField(max_length=512, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Check if an artist file is being uploaded
        if self.artist_image:
            # Firebase storage bucket
            bucket = storage.bucket()

            # Create a blob for the image file in Firebase Storage
            blob_image = bucket.blob(f'artist/{self.artist_image.name}')

            # Upload the image file directly to Firebase
            blob_image.upload_from_file(self.artist_image.file, content_type=self.artist_image.file.content_type)

            # Make the image file public and save its URL
            blob_image.make_public()
            self.firebase_artist_image_url = blob_image.public_url

            # Prevent local storage of the image file
            self.artist_image = None

        # Check if an artist file is being uploaded
        if self.about_image:
            # Firebase storage bucket
            bucket = storage.bucket()

            # Create a blob for the image file in Firebase Storage
            blob_image = bucket.blob(f'artist_about/{self.about_image.name}')

            # Upload the image file directly to Firebase
            blob_image.upload_from_file(self.about_image.file, content_type=self.about_image.file.content_type)

            # Make the image file public and save its URL
            blob_image.make_public()
            self.firebase_about_image_url = blob_image.public_url

            # Prevent local storage of the image file
            self.about_image = None

        # Call the parent class's save method
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
