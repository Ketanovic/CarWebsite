from django.db import IntegrityError
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
        employee = Salesperson.objects.all().values()
        return JsonResponse(
            {"salespeople": list(employee)},
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            employee = Salesperson.objects.create(**content)
            return JsonResponse(
                employee,
                encoder=SalespersonEncoder,
                safe=False
            )
        except IntegrityError:
            return JsonResponse(
                {"error": "Employee ID has been used."},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, id):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                {"message": "Salesperson has been deleted,"},
                status=200,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson doesn't exist."},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all().values()
        return JsonResponse(
            {"Customer": list(customers)},
            encoder=CustomerEncoder,
            safe=False
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
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"message": "Customer deleted successfully."},
                status=200
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer not found."},
                status=404,
            )


@require_http_methods(["GET", "POST"])
def api_sale(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all().values()

        for sale in sales:
            sale['price'] = str(sale['price'])

        return JsonResponse(
            {"sales": list(sales)},
            encoder=SalesEncoder,
            safe=False,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        vin = content.get("automobile")
        price = content.get("price")
        salesperson_id = content.get("salesperson")
        customer_id = content.get("customer")

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
                {"message": "Salesperson with the provided 'salesperson_id' does not exist."},
                status=400,
            )
            return response
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
            {"message": "Successfully created a Sale", "sale_id": sale.id},
            encoder=SalesEncoder, safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_sale(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                {"message": "Sale deleted successfully."},
                status=200
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale not found."},
                status=404,
            )
