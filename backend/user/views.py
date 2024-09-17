from pyexpat.errors import messages
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import UserInfo
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .serializers import OnlyNameserializer, Userserializer

@api_view(['POST'])
def login_user(request):

    # if user is already logged in
    if not request.user.is_anonymous:
        user = request.user
        if user.username == request.data['username']:
            return Response({
                "code": "alert",
                "user_id": user.username,
                "first_name": user.first_name,
                "message": "Already Logged In"
            })

    data = request.data
    username = data['username']

    if username is not None:
        login_password = data['password']
        user = authenticate(request, username=username, password=login_password)

        if user is not None:

            login(request, user)
            print("User Logged In")
            return Response(
                {
                    "code":"success",
                    "user_id": username,
                    "first_name": "User",
                    "message": "Login Successful"
                }
            )
        else:
            print("No user found")
            return Response(
                {
                    "code":"error",
                    "message": "Invalid Credentials"
                }
            )
    return Response({
        "code":"error",
        "message": "Invalid Credentials"
    })

@api_view(['POST'])
def signup(request):
    request_data = request.data
    new_username = request_data.get('username')
    if new_username:
        fname = request_data.get('first_name')
        lname = request_data.get('last_name')
        email = request_data.get('email')
        dob = request_data.get('dob')
        no = request_data.get('number')
        password = request_data.get('password')

        if(fname == "" or lname == "" or email == "" or dob == "" or no == "" or password == ""):
            return Response({
                "code": "error",
                "message": "Missing Information in one of the fields"
            })

        u = User.objects.filter(username=new_username)
        if not u:
            # saving user
            w = User.objects.create_user(new_username, email, password)

            # saving user info
            w_info = UserInfo.objects.create(
                user_id=new_username, first_name=fname, last_name=lname, dob=dob, number=no)
            
            w.save()
            w_info.save()
            return Response({
                "code": "success",
                "user_id": new_username,
                "message": "Signup Successful"
            })
        else:
            return Response({
                "code": "alert",
                "message": "Username Already Exists"
            })

    return Response({
        "code": "error",
        "message": "Invalid Credentials"
    })


@api_view(['GET'])
def getUser(request):
    user = request.user
    if user.is_authenticated:
        user_data = UserInfo.objects.filter(user_id=user)
        serialize_data = OnlyNameserializer(user_data, many=True)
        final_data = serialize_data.data
        return Response(final_data)
    else:
        return Response([
            {
                "code": "error",
                "message": "User not logged in"
            }
        ])


@api_view(['GET'])
def fullUser(request):
    user = request.user
    user_data = UserInfo.objects.filter(user_id=user)
    serialize_data = Userserializer(user_data, many=True)
    final_data = serialize_data.data
    return Response(final_data)


def logout_user(request):
    logout(request)
    print("Logged Out successfully")
    return Response({
        "code": "success",
        "message": "Logged Out"
    })
