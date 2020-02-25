from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from .models import *
import bcrypt


def index(request):
    return render(request, 'index.html')

def registration(request):
    errors = User.objects.basic_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('/')
    email = request.POST['email']
    email_db = User.objects.filter(email=email)
    if len(email_db) > 0:
        messages.error(request, "An Eventue user with this email already exists")
        return redirect('/')
    else:
        password = request.POST['password']
        pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        new_user = User.objects.create(f_name=request.POST['f_name'], l_name=request.POST['l_name'], email=request.POST['email'], password=pw_hash)
        user_id = new_user.id
        request.session['user_id'] = user_id
        return redirect('/home')
    
def login(request):
    user = User.objects.filter(email=request.POST['email'])
    if user:
        existing_user = user[0]
        if bcrypt.checkpw(request.POST['password'].encode(), existing_user.password.encode()):
            request.session['user_id'] = existing_user.id
            return redirect('/home')
    messages.error(request,'passwords dont match or invalid email!')
    return redirect('/')

def home(request):
    if 'user_id' in request.session:
        context = {
            'user': User.objects.get(id=request.session['user_id'])
        }
    return render(request, 'home.html', context)


