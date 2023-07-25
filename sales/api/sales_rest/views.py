from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Salesperson


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"saleperson": salesperson},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        employee = Salesperson.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=SalespersonEncoder,
            safe=False,
        )
