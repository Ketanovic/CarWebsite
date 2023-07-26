import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something

from service_rest.models import AutomobileVO

def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
            if response.status_code == 200:
                content = response.json()
                automobiles = content.get("autos", [])

                for autodata in automobiles:
                    vin = autodata.get("vin")
                    if vin:
                        _, created = AutomobileVO.objects.get_or_create(vin=vin, defaults={"sold": autodata.get("sold", False)})

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
