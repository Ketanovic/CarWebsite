from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time", "reason", "status", "vin", "customer",
                  "technician"]
    encoders = {
        "technician": TechnicianListEncoder
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, id=None):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": list(appointments.values())},
            encoder=AppointmentListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        date_time = content.get("date_time")
        reason = content.get("reason")
        sold = content.get("sold")
        vin = content.get("vin")
        customer = content.get("customer")
        technician_id = content.get("technician_id")

        if not date_time or not reason or not sold or not vin or not customer or not technician_id:
            response = JsonResponse(
                {"message": "Missing required fields"}, status=400,
            )
            return response

        try:
            vin = AutomobileVO.objects.get(vin=vin)
        except AutomobileVO.DoesNotExist:
            vin = AutomobileVO.objects.create(vin=vin, sold=False)

        technician = None
        try:
            technician = Technician.objects.get(pk=technician_id)
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "Technician does not exist"}, status=404,
            )
<<<<<<< HEAD
=======
            return response

        appointment = Appointment.objects.create(
            date_time=date_time,
            reason=reason,
            sold=sold,
            vin=vin,
            customer=customer,
            technician=technician,
        )
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )


>>>>>>> b34705852760f7c64a5a5e54cdcf817e51cd8350

        appointment = Appointment.objects.create(
            date_time=date_time,
            reason=reason,
            status=status,
            vin=vin,
            customer=customer,
            technician=technician,
        )
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )

# Create your views here.
