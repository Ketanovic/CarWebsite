from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_delete_appointment, api_finish_appointment, api_cancel_appointment


urlpatterns = [
     path("api/technicians/", api_list_technicians,
          name="api_list_technicians"),
     path("api/technicians/<int:id>", api_delete_technician,
          name="api_delete_technician"),
     path("api/appointments/", api_list_appointments,
          name="api_list_appointments"),
     path("api/appointments/<int:id>", api_delete_appointment,
          name="api_delete_appointment"),
     path("api/appointments/<int:id>/finish", api_finish_appointment,
          name="api_finish_appointment"),
     path("api/appointments/<int:id>/cancel", api_cancel_appointment,
          name="api_cancel_appointment")
]
