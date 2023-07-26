from django.urls import path

from .views import (
    api_sales,
    api_sale,
    api_employee,
    api_saleperson,
)


urlpatterns = [
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
    path("salespeople/", api_saleperson, name="api_salesperson"),
    path("salespeople/", api_employee, name="api_employee")
]
