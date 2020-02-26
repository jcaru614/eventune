from django.urls import path
from . import views	
                    
urlpatterns = [
    path('', views.index),
    path('registration', views.registration),
    path('login', views.login),
    path('home', views.home),
    path('profile/<int:id>', views.profile),
    path('update/<int:id>', views.update),
    path('updatepw/<int:id>', views.update_pw),
    path('delete/<int:id>', views.delete_account),
    path('myevents', views.my_events),
    path('logout', views.logout),
]