from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=150)
    sold = models.BooleanField(null=True)


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=150)


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=True)
    reason = models.TextField()
    status = models.BooleanField(null=False)
    vin = models.CharField(max_length=150)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    objects = models.Manager()
