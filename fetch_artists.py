import requests
import json

url = "https://fanspherebackend.vercel.app/api/artists"
try:
    response = requests.get(url)
    data = response.json()
    if "data" in data:
        names = [artist["name"] for artist in data["data"]]
        print(json.dumps(names))
    else:
        print("No data found")
except Exception as e:
    print(f"Error: {e}")
