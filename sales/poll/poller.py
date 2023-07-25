import django
import os
import sys
import time
import json
import requests
from sales_rest.models import AutomobileVO


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            response = requests.get("http://inventory-api:8100/api/automobile/")

            content = json.loads(response.content)

            for autos in content["automobiles"]:

                AutomobileVO.objects.update_or_create(
                    import_href=autos["href"],
                    defaults={"automobile": autos["automobile"]}


                )
        except Exception as e:
            print("Error")
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
