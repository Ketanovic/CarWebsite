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
    elif request.method == "POST":
        content = json.loads(request.body)
        vin = content.get("vin")
        technician_id = content.get("technician")
        
        if not vin or not technician_id:
            response = JsonResponse(
                {"message": "Missing required fields"}, status=400,
            )
            return response

        try:
            automobile = AutomobileVO.objects.get(vin=vin)
        except AutomobileVO.DoesNotExist:
            automobile = AutomobileVO.objects.create(vin=vin, status=False)

        try:
            technician = Technician.objects.get(pk=technician_id)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404)

        appointment = Appointment.objects.create(
            automobile=automobile,
            vin=vin,
            technician=technician

        )
        return JsonResponse({"message": "Appointment has been created successfully."}, status=201)


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
