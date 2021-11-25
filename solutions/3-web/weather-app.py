import requests
import sys


KEY = "bdc3b5555071a1e48ed8f445e274b3d9"
URL = "http://api.openweathermap.org/data/2.5/weather"


def make_request():
    location = sys.argv[1]
    req_url = URL + "?q=" + location + "&units=metric" + "&appid=" + KEY
    response = requests.get(req_url)
    return response.json()


def get_current(response_json):
    response_weather = response_json["weather"]
    response_clouds = response_json["clouds"]
    response_wind = response_json["wind"]
    response_main = response_json["main"]

    return {
        'weather': response_weather[0]["main"],
        'description': response_weather[0]["description"],
        'temperature': response_main["temp"],
        'temperature_min': response_main["temp_min"],
        'temperature_max': response_main["temp_max"],
        'cloudiness': response_clouds["all"],
        'windiness': response_wind["speed"],
        'pressure': response_main["pressure"],
        'humidity': response_main["humidity"]
    }


def print_current(current):
    print("Weather: {}({})".format(current['weather'], current['description']))
    print("Temperature: {} C".format(current['temperature']))
    print("Minimum temperature: {} C ".format(current['temperature_min']))
    print("Maximum temperature: {} C ".format(current['temperature_max']))
    print("Cloudiness: {} %".format(current['cloudiness']))
    print("Wind speed: {} meter/sec".format(current['windiness']))
    print("Pressure: {} hPa".format(current['pressure']))
    print("Humudity: {} %".format(current['humidity']))


response_json = make_request()
if response_json["cod"] == 200:
    current = get_current(response_json)
    print_current(current)
else:
    if response_json["cod"] == '404':
        print("Error: Location is not found.")
    else:
        print("Error {} has occured.".format(response_json["cod"]))
