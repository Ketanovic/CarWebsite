from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment
from django.shortcuts import get_object_or_404, redirect, render

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
        appointments = Appointment.objects.all().values()
        return JsonResponse(
            {"appointments": list(appointments)},
            encoder=AppointmentListEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            try:
                technician_id = content["technician"]
                technician = Technician.objects.get(id=technician_id)
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Does not match any technicians"}, status=400
                )
            vin = content["vin"]
            if AutomobileVO.objects.filter(vin=vin).count() == 1:
                content["is_vip"] = True
            appointment = Appointment.objects.create(**content)
            return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)
        except Exception:
            response = JsonResponse({"message": "Could not create appointment"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_appointment(request, id):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    appointment = get_object_or_404(Appointment, id=id)
    if appointment.status == 'finished':
        return JsonResponse(
            {'message': 'Appointment is already finished.'}, status=404,
            )

    appointment.status = 'finished'
    appointment.save()

    return JsonResponse(
        {'message': 'Appointment has been finished.'}, status=200,
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    appointment = get_object_or_404(Appointment, id=id)
    if appointment.status == 'cancelled':
        return JsonResponse(
            {'message': 'Appointment is already cancelled.'}, status=404,
            )

    appointment.status = 'cancelled'
    appointment.save()

    return JsonResponse(
        {'message': 'Appointment has been cancelled.'}, status=200,
    )
# Create your views here.
