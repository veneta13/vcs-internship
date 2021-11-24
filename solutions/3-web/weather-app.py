import requests


key = "bdc3b5555071a1e48ed8f445e274b3d9"
location = input("Enter location: ")
req_url = "http://api.openweathermap.org/data/2.5/weather?"
req_url = req_url + "q=" + str(location) + "&units=metric" + "&appid=" + key
response = requests.get(req_url)
response_json = response.json()

if response_json["cod"] == '404':
    print("Error: Location is not found.")

elif response_json["cod"] == 200:
    response_weather = response_json["weather"]
    response_clouds = response_json["clouds"]
    response_wind = response_json["wind"]
    response_main = response_json["main"]

    weather = response_weather[0]["main"]
    weather_desription = response_weather[0]["description"]
    temperature = response_main["temp"]
    temperature_min = response_main["temp_min"]
    temperature_max = response_main["temp_max"]
    cloudiness = response_clouds["all"]
    windiness = response_wind["speed"]
    pressure = response_main["pressure"]
    humidity = response_main["humidity"]

    print("Weather: {} ({})".format(weather, weather_desription))
    print("Temperature: {} C".format(temperature))
    print("Minimum temperature: {} C ".format(temperature_min))
    print("Maximum temperature: {} C ".format(temperature_max))
    print("Cloudiness: {} %".format(cloudiness))
    print("Wind speed: {} meter/sec".format(windiness))
    print("Pressure: {} hPa".format(pressure))
    print("Humudity: {} %".format(humidity))

else:
    print("Error {} has occured.".format(response_json["cod"]))
