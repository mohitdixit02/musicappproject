from rest_framework import serializers
from .models import UserInfo

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

class OnlyNameserializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['user_id','first_name']