import requests
import sys
from urllib.parse import urlencode, quote_plus


KEY = "bdc3b5555071a1e48ed8f445e274b3d9"
URL = "http://api.openweathermap.org/data/2.5/weather"


def get_json_of_location(location):
    req_dict = {'q': location, 'units': 'metric', 'appid': KEY}
    req_params = urlencode(req_dict, quote_via=quote_plus)
    req_url = "{}?{}".format(URL, req_params)
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


if __name__ == '__main__':
    location = sys.argv[1]
    response_json = get_json_of_location(location)
    if response_json["cod"] == 200:
        current = get_current(response_json)
        print_current(current)
    else:
        if response_json["cod"] == '404':
            print("Error: Location is not found.")
        else:
            print("Error {} has occured.".format(response_json["cod"]))
