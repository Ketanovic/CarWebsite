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
        "automobile": AutomobileVOEncoder
    }


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        employee = Salesperson.objects.all()
        return JsonResponse(
            {"Employee": employee},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        employee_id = content.get("employee_id")

        try:
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            return JsonResponse(
                {"message": "Salesperson with employee_id '{employee_id}' already exists."},
                status=400,
            )
        except Salesperson.DoesNotExist:
            pass
        employee = Salesperson.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_delete_salesperson(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"Customer": customer},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_customer(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_sale(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": list(sales.values())},
            encoder=SalesEncoder,
            safe=False,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        vin = content.get("vin")
        price = content.get("price")
        salesperson_id = content.get("salesperson_id")
        customer_id = content.get("customer_id")

        if not vin or not price or not salesperson_id or not customer_id:
            response = JsonResponse(
                {"message": "Missing required fields"}, status=400,
            )
            return response

        try:
            automobile = AutomobileVO.objects.get(vin=vin)
        except AutomobileVO.DoesNotExist:
            automobile = AutomobileVO.objects.create(vin=vin, sold=False)
        try:
            salesperson = Salesperson.objects.get(pk=salesperson_id)
        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"message": "Salesperson with the provided 'salesperson_id' does not exist."}, status=400
            )
        try:
            customer = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "Customer with the provided 'customer_id' does not exist"},
                status=400
            )
            return response

        sale = Sale.objects.create(
            automobile=automobile,
            salesperson=salesperson,
            customer=customer,
            price=price
        )

        return JsonResponse(
            {"message": "Successfully create a Sale", "sale_id": sale.id},
            encoder=SalesEncoder,
        )


@require_http_methods(["DELETE"])
def api_delete_sale(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
