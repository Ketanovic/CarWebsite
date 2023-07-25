from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True),
    sold = models.BooleanField(default=False),
    import_href = models.CharField(max_length=200, unique=True, default="")


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} (ID: {self.employee_id})"


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name} (Phone: {self.phone_number})"


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE)
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.automobile

    def get_api_url(self):
        return reverse("api_sales", kwargs={"id": self.id})
