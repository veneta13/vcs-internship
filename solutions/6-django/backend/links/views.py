from urllib import request
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup
from rest_framework.response import Response
from rest_framework import permissions, viewsets
from rest_framework import generics
from links.serializers import LinkSerializer
from links.models import Link


headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }


def get_title(html):
    title = None
    if html.title.string:
        title = html.title.string
    elif html.find("h1"):
        title = html.find("h1").string
    return title


def get_description(html):
    description = None
    if html.find("meta", property="description"):
        description = html.find(
            "meta", property="description").get('content')
    elif html.find("p"):
        description = html.find("p").contents
    return description


def get_image(html):
    image = None
    if html.find("meta", property="image"):
        image = html.find(
            "meta", property="image").get('content')
    elif html.find("img", src=True):
        image = html.find(
            "img").get('src')
    return image


def make_json(url):
    req = requests.get(url, headers)
    html = BeautifulSoup(req.content, 'html.parser')
    return {
        'link': url,
        'title': get_title(html),
        'description': get_description(html),
        'image': get_image(html),
    }


class LinkViewSet(viewsets.ModelViewSet,
                  generics.ListAPIView,
                  generics.RetrieveAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def retrieve(self, request, pk):
        url = self.get_object().link
        response_obj = make_json(url)
        return JsonResponse(response_obj, safe=False)
