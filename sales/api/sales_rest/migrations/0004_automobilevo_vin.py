# Generated by Django 4.0.3 on 2023-07-26 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_remove_automobilevo_import_href_automobilevo_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(default='', max_length=17, unique=True),
        ),
    ]
