from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Customer, Sale, AutomobileVO, Salesperson


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "import_href",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_saleperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"person": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee = Salesperson.objects.create(**content)
            return JsonResponse(
                employee,
                encoder=SalesEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the Salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_employee(request, pk):
    if request.method == "GET":
        try:
            employee = Salesperson.objects.get(id=pk)
            return JsonResponse(
                employee,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            employee = Salesperson.objects.get(id=pk)
            employee.delete()
            return JsonResponse(
                employee,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            employee = Salesperson.objects.get(id=pk)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(employee, prop, content[prop])
            employee.save()
            return JsonResponse(
                employee,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response














@require_http_methods(["GET", "POST"])
def api_sales(request, automobile_vo_id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sale_id = content["sale_id"]
            sale = Sale.objects.get(pk=sale_id)
            content["sale"] = sale
            sales = Sale.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SalesEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "DELETE":
        try:
            count, _ = Sale.objects.filter(id=id).delete()
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "invalid Sale id"}, status=400
            )
        return JsonResponse({
            "deleted": count > 0}
        )
