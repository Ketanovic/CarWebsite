from django.http import Http404, JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
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
        "pk"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "pk"
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
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        employee = Salesperson.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, pk):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            raise Http404("Salesperson doesn't exist.")


@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"Customer": customers},
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
def api_delete_customer(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                {"message": "Customer deleted successfully."},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            raise Http404("Customer not found.")


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
                {"sales": sales},
                encoder=SalesEncoder,
                safe=False,
            )
    else:
        content = json.loads(request.body)

        try:
            auto_vin = content["automobile"]
            autoVO = AutomobileVO.objects.get(vin=auto_vin)
            if autoVO.sold == False:
                content["automobile"] = autoVO
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(pk=salesperson_id)
            content["salesperson"] = salesperson
            customer_id = content["customer"]
            customer = Customer.objects.get(pk=customer_id)
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            raise Http404("Auto does not exist")

        except Salesperson.DoesNotExist:
            raise Http404("Salesperson does not exist")

        except Customer.DoesNotExist:
            raise Http404("Customer does not exist")

        sale = Sale.objects.create(**content)

        autoVO.sold = True
        autoVO.save()

        json_data = json.dumps({"sold": True})
        AutoUrl = f'http://project-beta-inventory-api-1:8000/api/automobiles/{auto_vin}/'
        response = requests.put(AutoUrl,
                                data=json_data,
                                headers={'Content-Type': 'application/json'})
        if response.status_code != 200:
            print("auto request failed", response.status_code)

        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_sale(request, pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                {"message": "Sale deleted successfully."},
                status=200
            )
        except Sale.DoesNotExist:
            raise Http404("Sale does not exist")
