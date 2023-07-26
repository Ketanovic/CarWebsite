from django.urls import path

from .views import (
    api_available_ids,
    api_customer,
    api_delete_customer,
    api_delete_sale,
    api_delete_salesperson,
    api_sale,
    api_salesperson,
)


urlpatterns = [
    path("salespeople/",
         api_salesperson,
         name="api_salesperson"),
    path("salespeople/<int:id>/",
         api_delete_salesperson,
         name="delete_salespeople"),
    path("customers/",
         api_customer,
         name="api_customers"),
    path("customers/<int:id>/",
         api_delete_customer,
         name="api_delete_customers"),
    path("sales/",
         api_sale,
         name="api_sales"),
    path("sales/<int:id>/",
         api_delete_sale,
         name="api_delete_sales"),
]
