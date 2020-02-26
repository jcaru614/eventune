from django.urls import path
from . import views	
                    
urlpatterns = [
    path('', views.index),
    path('registration', views.registration),
    path('login', views.login),
    path('home', views.home),
    path('profile/<int:id>', views.profile),
    path('update/<int:id>', views.update),
    path('myevents', views.my_events),
    path('logout', views.logout),
]