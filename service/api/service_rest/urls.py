from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments


urlpatterns = [
    path("api/technicians/", api_list_technicians,
         name="api_list_technicians"),
    path("api/technicians/<int:id>", api_delete_technician,
         name="api_delete_technician"),
    path("api/appointments/", api_list_appointments,
         name="api_list_appointments"),
]
