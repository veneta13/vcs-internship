import requests
from bs4 import BeautifulSoup


headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Opera/9.60 (Windows NT 6.0; U; en) Presto/2.1.1'
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
        description = html.find("meta", property="description").get('content')
    elif html.find("p"):
        description = html.find("p").contents
    return description


def get_image(html):
    image = ""
    if html.find("meta", property="image"):
        image = html.find("meta", property="image").get('content')
    elif html.find("img", src=True):
        image = html.find("img").get('src')
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
