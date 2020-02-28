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
    path('add_profile_pic/<int:id>', views.add_profile_pic),
    path('add_event', views.add_event),
    path('myevents', views.my_events),
    path('remove_event/<int:id>', views.remove_event),
    path('logout', views.logout),
]