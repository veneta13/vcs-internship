import requests
from bs4 import BeautifulSoup
from rest_framework import serializers
from links.models import Link

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }


def get_title(html):
    title = ""
    if html.title.string:
        title = html.title.string
    elif html.find("h1"):
        title = html.find("h1").string
    return title


def get_description(html):
    description = ""
    if html.find("meta", property="description"):
        description = html.find(
            "meta", property="description").get('content')
    elif html.find("p"):
        description = html.find("p").contents
    return description


def get_image(html):
    image = ""
    if html.find("meta", property="image"):
        image = html.find(
            "meta", property="image").get('content')
    elif html.find("img", src=True):
        image = html.find(
            "img").get('src')
    return image


def get_page_information(url):
    req = requests.get(url, headers)
    html = BeautifulSoup(req.content, 'html.parser')
    return {
        'link': url,
        'title': get_title(html),
        'description': get_description(html),
        'image': get_image(html),
    }


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['url', 'link', 'title', 'description', 'image']

    def create(self, validated_data):
        request_url = validated_data.get('link')
        page_info = get_page_information(request_url)

        link = Link.objects.create(
            link=page_info.get('link'),
            title=page_info.get('title'),
            description=page_info.get('description'),
            image=page_info.get('image'),
        )
        return link
