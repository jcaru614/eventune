from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from .models import *
import bcrypt


def index(request):
    if 'user_id' in request.session:
        return redirect('/home')
    return render(request, 'index.html')

def registration(request):
    errors = User.objects.basic_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
    email = request.POST['email']
    email_db = User.objects.filter(email=email)
    if len(email_db) > 0:
        messages.error(request, "An Eventue user with this email already exists")
    else:
        password = request.POST['password']
        pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        new_user = User.objects.create(f_name=request.POST['f_name'], l_name=request.POST['l_name'], email=request.POST['email'], password=pw_hash, city=request.POST['city'])
        user_id = new_user.id
        request.session['user_id'] = user_id
    return redirect('/')
    
def login(request):
    user = User.objects.filter(email=request.POST['email'])
    if user:
        existing_user = user[0]
        if bcrypt.checkpw(request.POST['password'].encode(), existing_user.password.encode()):
            request.session['user_id'] = existing_user.id
    messages.error(request,'passwords dont match or invalid email!')
    return redirect('/')

def logout(request):
    if 'user_id' in request.session:
        del request.session['user_id']
    return redirect('/')

def delete_account(request, id):
    if 'user_id' in request.session:
        d = User.objects.get(id=id)
        d.delete()
    return redirect('/')

def home(request):
    if 'user_id' in request.session:
        context = {
            'user': User.objects.get(id=request.session['user_id'])
        }
    return render(request, 'home.html', context)

def profile(request, id):
    if 'user_id' in request.session:
        context = {
            'user': User.objects.get(id=request.session['user_id']),
        }
        return render(request, 'profile.html', context)
    return redirect('/')

def update(request, id):
    if 'user_id' in request.session:
        u = User.objects.get(id=id)
        errors = User.obj_info.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
        else:
            u.f_name = request.POST['f_name']
            u.l_name = request.POST['l_name']
            u.email = request.POST['email']
            u.city = request.POST['city']
            u.save()
            messages.success(request,'Your information has been updated!')
        return redirect(f'/profile/{id}')
    return redirect('/')

def update_pw(request, id):
    if 'user_id' in request.session:
        up = User.objects.get(id=id)
        errors = User.obj_pw.basic_validator(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
        else:
            password = request.POST['password']
            pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            up.password = pw_hash
            up.save()
            messages.success(request,'Your password has been updated!')
        return redirect(f'/profile/{id}')
    return redirect('/')

def add_profile_pic(request, id):
    if 'user_id' in request.session:
        upp = User.objects.get(id=id)
        upp.profile_image = request.POST['profile_pic']
        upp.save()
        messages.success(request,'Your profile picture has been updated!')
        return redirect(f'/profile/{id}')
    return redirect('/')

def add_event(request, id):
    if 'user_id' in request.session:
        api_id = request.GET['api_id']
        title = request.GET['title']
        date = request.GET['date']
        more_info = request.GET['url']
        picture = request.GET['pic']
        new_event = Event.objects.create(api_id=api_id, title=title, date=date, more_info=more_info, picture=picture, users=User.objects.get(id=id))
    return redirect('/')

def my_events(request):
    if 'user_id' in request.session:
        context = {
            'user': User.objects.get(id=request.session['user_id']),
            'events': User.objects.get(id=request.session['user_id']).events.all().order_by("-updated_at"),
        }
    return render(request, 'myevents.html', context)

# uninterested method



