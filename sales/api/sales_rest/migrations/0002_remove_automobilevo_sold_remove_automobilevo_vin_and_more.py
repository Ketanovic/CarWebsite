# Generated by Django 4.0.3 on 2023-07-25 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='sold',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='vin',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(default='', max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customer', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='salesperson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='salesperson', to='sales_rest.salesperson'),
        ),
    ]
