from django.http import JsonResponse, Http404
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
import requests


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id", "pk"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "phone_number", "address", "pk"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["price", "automobile", "salesperson", "customer"]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespersonEncoder,
            )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, pk):
    try:
        salesperson = Salesperson.objects.get(id=pk)
        salesperson.delete()
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False
        )
    except Salesperson.DoesNotExist:
        raise Http404("Salesperson does not exist")


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
                safe=False,
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
    try:
        customer = Customer.objects.get(id=pk)
        customer.delete()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    except Customer.DoesNotExist:
        raise Http404("Customer does not exist")


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
                {"sales": sales},
                encoder=SaleEncoder,
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
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_sale(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        sale.delete()
        return JsonResponse(
            {"message": "Sale deleted"},
            safe=False,
        )
    except Sale.DoesNotExist:
        raise Http404("Sale does not exist")
