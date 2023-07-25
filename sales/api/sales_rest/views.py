from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Sale, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "import_href",
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
def api_sales(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is None:
            sales = Sale.objects.all()
        else:
            sales = Sale.filter(autos=automobile_vo_id)
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        automobile_href = content["automobile"]

        automobile = AutomobileVO.objects.get(import_href=automobile_href)
        content["automobile"] = automobile
        sales = Sale.objects.create(**content)
        print(sales)

        return JsonResponse(
            sales,
            encoder=SalesEncoder,
            safe=False,
        )
