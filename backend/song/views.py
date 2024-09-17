from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Song
from .models import Artist
from .serializers import Itemserializer
from .serializers import Artistserializer
import mutagen
from mutagen.mp3 import MP3
from django.core.files import File
import os

@api_view(['GET'])
def getData(request):
    song_data = []

    # generating array of generes
    genere = Song.objects.values('genere')
    genr_array = {item['genere'] for item in genere}

    # dividing data on the basis of generes
    for i in genr_array:
        temp = Song.objects.filter(genere=i)
        temp_array = []
        serialize_data = Itemserializer(temp, many=True)
        temp_array.append(serialize_data.data)
        a = {
            'genere': i,
            'list': temp_array
        }
        song_data.append(a)

    return Response(song_data)


@api_view(['GET'])
def audio(request, songid):
    current_song = Song.objects.filter(id=songid)
    serialize_song = Itemserializer(current_song, many=True)
    return Response(serialize_song.data)


@api_view(['GET'])
def artist(request):
    artist_data = []

    # Adding duration automatically to songs
    # songdata = Song.objects.all()
    # for item in songdata:
    #         if(item.duration==0):
    #             audio_info = MP3(item.firebase_mp3_url)
    #             item.duration = audio_info.info.length
    #             item.save()

    # generating array of artists
    artist_names = Song.objects.values('artist')
    artist_array = {item['artist'] for item in artist_names}
    separate_artist_array = []
    for i in artist_array:
        i = i.split(', ')
        for k in i:
            if not k in separate_artist_array:
                separate_artist_array.append(k)

    # dividing data on the basis of artists
    for artist_name in separate_artist_array:
        temp = Artist.objects.filter(name=artist_name)
        if temp:
            serialize_data = Artistserializer(temp, many=True)
            artist_data.append(serialize_data.data)

    return Response(artist_data)


@api_view(['GET'])
def artistinfo(request, artistname):
    artist_info = Artist.objects.filter(name=artistname)
    serialize_artist = Artistserializer(artist_info, many=True)

    # Songs with artist
    songlist_array = []
    songlist = Song.objects.all()
    for item in songlist:
        if artistname in item.artist:
            song = Song.objects.filter(id=item.id)
            serlz2 = Itemserializer(song, many=True)
            songlist_array.append(serlz2.data)

    songlist_final = []
    for item in songlist_array:
        songlist_final.append(item[0])

    artistinfo_data = [{
        'artist_info': serialize_artist.data,
        'artist_song_list': songlist_final
    }]

    return Response(artistinfo_data)


@api_view(['GET'])
def album(request, album):
    songlist = Song.objects.filter(album=album)
    serlz = Itemserializer(songlist, many=True)
    return Response(serlz.data)


@api_view(['GET'])
def search(request, index):
    # defining result
    song_array = []
    artist_array = []
    album_array = []

    # Getting Song list for Song
    songlist = Song.objects.values('name')
    songlist_array = {item['name'] for item in songlist}
    for item in songlist_array:
        if index.lower() in item.lower():
            temp = Song.objects.filter(name=item)
            serlz = Itemserializer(temp, many=True)
            song_array.append(serlz.data[0])

    # Getting Song list for albums
    albumlist = Song.objects.values('album')
    albumlist_array = {item['album'] for item in albumlist}
    for item in albumlist_array:
        if (item != 'SINGLE'):
            if index.lower() in item.lower():
                temp = Song.objects.filter(album=item)
                serlz = Itemserializer(temp, many=True)
                album_array.append(serlz.data[0])

    # Getting Artist list for artists
    artistlist = Artist.objects.values('name')
    artistlist_array = {item['name'] for item in artistlist}
    for item in artistlist_array:
        if index.lower() in item.lower():
            temp = Artist.objects.filter(name=item)
            serlz = Artistserializer(temp, many=True)
            artist_array.append(serlz.data[0])

    # Combining all Data
    final_response = {
        'song': song_array,
        'artist': artist_array,
        'album': album_array
    }

    return Response(final_response)

@api_view(['GET'])
def category(request,catg):
    song_list_query=Song.objects.filter(genere=catg)
    serlz=Itemserializer(song_list_query,many=True)
    Response_array={
        'genere':catg,
        'list':serlz.data
    }
    return Response(Response_array)


@api_view(['GET'])
def test_upload(request):
    song_list_query=Song.objects.all()
    serlz = Itemserializer(song_list_query,many=True)
    # for i in serlz.data:
    #     new_obj = Song(
    #     name = i['name'],
    #     artist = i['artist'],
    #     album = i['album'],
    #     genere = i['genere'],
    #     plays = i['plays'],
    # )
    i = serlz.data[0]
    print(i)
    new_obj = Song(
        name = i['name'],
        artist = i['artist'],
        album = i['album'],
        genere = i['genere'],
        plays = i['plays'],
    )

    # mp3_file_path = os.path.join('media/song/media')
    # print(mp3_file_path)

    # # Open the MP3 file in binary mode
    # with open(mp3_file_path, 'rb') as f:
    #     django_file = File(f)

    #     # Assign the file to the mp3_file field
    #     new_media.mp3_file.save(os.path.basename(mp3_file_path), django_file)

    #     # Save the model instance
    #     new_media.save()
    
    return Response("Start")