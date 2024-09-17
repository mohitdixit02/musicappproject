# Generated by Django 5.0.4 on 2024-09-07 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song', '0008_remove_artist_about_img_remove_artist_artist_img_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='about_image',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='artist_image',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='firebase_about_image_url',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='firebase_artist_image_url',
        ),
        migrations.RemoveField(
            model_name='song',
            name='firebase_image_url',
        ),
        migrations.RemoveField(
            model_name='song',
            name='firebase_mp3_url',
        ),
        migrations.RemoveField(
            model_name='song',
            name='image_file',
        ),
        migrations.RemoveField(
            model_name='song',
            name='mp3_file',
        ),
        migrations.AddField(
            model_name='artist',
            name='about_img',
            field=models.ImageField(default='', upload_to='song/media/artist'),
        ),
        migrations.AddField(
            model_name='artist',
            name='artist_img',
            field=models.ImageField(default='', upload_to='song/media/artist'),
        ),
        migrations.AddField(
            model_name='song',
            name='song_img',
            field=models.ImageField(default='', upload_to='song/media'),
        ),
        migrations.AddField(
            model_name='song',
            name='song_source',
            field=models.FileField(default='', upload_to='song/media'),
        ),
    ]