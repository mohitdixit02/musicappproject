from django.shortcuts import render, redirect
from django.http import HttpResponse

def index(request):
    # return render(request, 'index.html')
    # return HttpResponse("""
    #     <h1 style="text-align:center"> Server Running </h1>
    # """)
    return redirect("https://musicappproject-gold.vercel.app")

def indexRepath(request):
    return render(request, 'index.html')