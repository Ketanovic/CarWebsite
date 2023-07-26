from django.urls import path

from .views import (
    api_delete_salesperson,
    api_sales,
    api_sales,
    api_salesperson,
)


urlpatterns = [
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sales, name="api_sale"),
    path("salespeople/", api_salesperson, name="api_salesperson"),
    path("salesperson/<int:id>/", api_delete_salesperson, name="delete_salesperson")
]
