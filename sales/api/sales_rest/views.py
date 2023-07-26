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
            try:
                sales = Sale.filter(autos=automobile_vo_id)
            except AutomobileVO.DoesNotExist:
                return JsonResponse({"message": "Invalid Automobile id"},
                                    status=400)
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)

        automobile_href = content["automobile"]

        try:
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid location id"}, status=400)
        content["automobile"] = automobile
        sales = Sale.objects.create(**content)

        return JsonResponse(
            sales,
            encoder=SalesEncoder,
            safe=False,
        )


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
