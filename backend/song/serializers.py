from rest_framework import serializers
from .models import Song
from .models import Artist

class Itemserializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class Artistserializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'