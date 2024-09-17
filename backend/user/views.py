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
    data = json.loads(request.body.decode('utf-8'))
    username = data['username']

    if username is not None:
        login_password = data['password']
        user = authenticate(request, username=username, password=login_password)

        if user is not None:
            if user.is_authenticated:
                return Response({
                    "user_id": username,
                    "first_name": user.first_name,
                    "message": "Already Logged In"
                })

            login(request, user)
            print("User Logged In")
            return Response(
                {
                    "user_id": username,
                    "first_name": "User",
                    "message": "Login Successful"
                }
            )
        else:
            return Response(
                {
                    "user_id": "none",
                    "first_name": "User",
                    "message": "Invalid Credentials"
                }
            )
    return Response({
        "user_id": "none",
        "first_name": "User",
        "message": "Invalid Credentials"
    })


def signup(request):
    new_username = request.POST.get('username')
    if new_username:
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = request.POST.get('email')
        dob = request.POST.get('dob')
        address = request.POST.get('address')
        no = request.POST.get('number')
        password = request.POST.get('password')
        u = User.objects.filter(username=new_username)
        if not u:
            w = User.objects.create_user(new_username, email, password)
            w.save()
            w_info = UserInfo.objects.create(
                user_id=new_username, first_name=fname, last_name=lname, dob=dob, address=address, number=no)
            w_info.save()
            messages.success(request, "Signup Successfully")
            return redirect('/user/login')
        else:
            messages.error(request, "Username already exists")

    return render(request, 'signup.html')


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
                "user_id": "none",
                "first_name": "User"
            }
        ])


@api_view(['GET'])
def fullUser(request):
    user = request.user
    user_data = UserInfo.objects.filter(user_id=user)
    serialize_data = Userserializer(user_data, many=True)
    final_data = serialize_data.data
    return Response(final_data)
    # return Response([
    #     {
    #         "user_id": "mohit_vsht",
    #         "first_name": "Mohit",
    #         "last_name": "Sharma",
    #         "dob": "2002-07-14",
    #         "address": "A-37, Ganga Bhawan, IIT-Roorkee",
    #         "number": "7009446375"
    #     }
    # ])


def logout_user(request):
    logout(request)
    return redirect('/')
