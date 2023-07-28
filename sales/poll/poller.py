import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something

from sales_rest.models import AutomobileVO


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            response = requests.get('http://project-beta-inventory-api-1:8000/api/automobiles/')
            content = json.loads(response.content)
            for auto in content["autos"]:
                autoVO, created = AutomobileVO.objects.update_or_create(
                    vin = auto["vin"]
                )
                if created:
                    autoVO.sold = False
                    autoVO.save()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
