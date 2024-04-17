from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # return render(request, 'index.html')
    return HttpResponse("""
        <h1 style="text-align:center"> Server Running </h1>
    """)

def indexRepath(request):
    return render(request, 'index.html')