from django.urls import path
from .views import api_salesperson


urlpatterns = [
    path("salespeople/", api_salesperson, name="api_salesperson"),

]
