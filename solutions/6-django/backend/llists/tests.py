import pytest
from collections import OrderedDict
from django.urls import reverse
import conftest


@pytest.mark.django_db
def test_list_lists(client, list):
    response = client.get(reverse("lists-list"))
    assert response.status_code == 200
    assert response.data["results"][0]["name"] == list.name
    assert response.data["results"][0]["description"] == list.description
    assert response.data["results"][0]["public"] is list.public


@pytest.mark.django_db
def test_get_own_list(client, list, link):
    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == list.name
    assert response.data.get("public") is list.public
    assert response.data.get("links")[0].get("link") == link.link
    assert response.data.get("description") == list.description


@pytest.mark.django_db
def test_get_private_list(client, list, other_private_list):
    url = reverse("lists-detail", kwargs={"pk": other_private_list.id})
    response = client.get(url)
    assert response.status_code == 404


@pytest.mark.django_db
def test_get_public_list(client, list, other_public_list):
    url = reverse("lists-detail", kwargs={"pk": other_public_list.id})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == other_public_list.name
    assert response.data.get("description") == other_public_list.description
    assert response.data.get("public") is other_public_list.public


@pytest.mark.django_db
def test_create_empty_public_list(client):
    list = {
        "name": "My public test list",
        "description": "Test list description",
        "public": True
    }

    response = client.post(
        reverse("lists-list"),
        list
    )
    assert response.status_code == 201
    assert response.data.get("name") == list.get("name")
    assert response.data.get("description") == list.get("description")
    assert response.data.get("public") is list.get("public")


@pytest.mark.django_db
def test_create_empty_private_list(client):
    list = {
        "name": "My private test list",
        "description": "Test list description",
        "public": False
    }

    response = client.post(
        reverse("lists-list"),
        list
    )
    assert response.status_code == 201
    assert response.data.get("name") == list.get("name")
    assert response.data.get("description") == list.get("description")
    assert response.data.get("public") is list.get("public")


@pytest.mark.django_db
def test_add_link_update_existing_list(client, list):
    list_update = {
        "name": "My updated list",
        "description": "My updated description",
        "public": False,
        "links": ["http://www.google.com", "http://www.example.com"],
    }
    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.put(
        url,
        list_update
    )
    assert response.status_code == 200

    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == list_update.get("name")
    assert response.data.get("description") == list_update.get("description")
    assert response.data.get("public") is list_update.get("public")
    assert response.data.get("links") == [
        OrderedDict(
            [
                ("url", "http://testserver/api/links/1/"),
                ("link", "http://www.google.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 1)
            ]
        ),
        OrderedDict(
            [
                ("url", "http://testserver/api/links/2/"),
                ("link", "http://www.example.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 2)
            ]
        ),
    ]


@pytest.mark.django_db
def test_add_links_to_public_list(client):
    list = {
        "name": "My public test list",
        "description": "Test list description",
        "public": True
    }

    response = client.post(
        reverse("lists-list"),
        list
    )
    assert response.status_code == 201
    assert response.data["url"] == "http://testserver/api/lists/1/"

    links = ["https://www.google.com",
             "https://www.example.com",
             "https://www.google.com"]

    for currentLink in links:
        link_resp = client.patch(
            response.data["url"],
            {"link": currentLink}
        )
        assert link_resp.status_code == 200

    add_link_response = client.get(reverse("lists-detail", kwargs={"pk": 1}))
    assert add_link_response.status_code == 200

    result = [
        OrderedDict(
            [
                ("url", "http://testserver/api/links/1/"),
                ("link", "https://www.google.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 1)
            ]
        ),
        OrderedDict(
            [
                ("url", "http://testserver/api/links/2/"),
                ("link", "https://www.example.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 2)
            ]
        ),
    ]

    assert add_link_response.data.get("links") == result

    url = reverse("lists-detail", kwargs={"pk": 1})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == "My public test list"
    assert response.data.get("public") is True
    assert response.data.get("links")[0].get(
        "link") == "https://www.google.com"
    assert response.data.get("links")[1].get(
        "link") == "https://www.example.com"


@pytest.mark.django_db
def test_add_links_to_private_list(client):
    list = {
        "name": "My public test list",
        "description": "Test list description",
        "public": False
    }
    response = client.post(
        reverse("lists-list"),
        list
    )
    assert response.status_code == 201
    assert response.data["url"] == "http://testserver/api/lists/1/"

    links = ["https://www.google.com", "https://www.example.com"]

    for currentLink in links:
        link_resp = client.patch(
            response.data["url"],
            {"link": currentLink}
        )
        assert link_resp.status_code == 200

    add_link_response = client.get(reverse("lists-detail", kwargs={"pk": 1}))
    assert add_link_response.status_code == 200

    result = [
        OrderedDict(
            [
                ("url", "http://testserver/api/links/1/"),
                ("link", "https://www.google.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 1)
            ]
        ),
        OrderedDict(
            [
                ("url", "http://testserver/api/links/2/"),
                ("link", "https://www.example.com"),
                ("title", ""),
                ("description", ""),
                ("image", ""),
                ("id", 2)
            ]
        ),
    ]

    assert add_link_response.data.get("links") == result


@pytest.mark.django_db
def test_delete_own_list(client, list):
    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.delete(url)
    assert response.status_code == 204


@pytest.mark.django_db
def test_unsucessfull_deletion_private_list(client, list, other_private_list):
    url = reverse("lists-detail", kwargs={"pk": other_private_list.id})
    response = client.delete(url)
    assert response.status_code == 404


@pytest.mark.django_db
def test_unsucessfull_deletion_public_list(client, list, other_public_list):
    url = reverse("lists-detail", kwargs={"pk": other_public_list.id})
    response = client.delete(url)
    assert response.status_code == 403


@pytest.mark.django_db
def test_remove_link_from_list(client, list):
    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == list.name
    assert response.data.get("public") is list.public
    assert response.data.get("links")[0] == OrderedDict(
        [
            ("url", "http://testserver/api/links/1/"),
            ("link", "http://www.google.com"),
            ("title", ""), ("description", ""),
            ("image", ""),
            ("id", 1)
        ]
    )

    response = client.delete(
        reverse(
            "delete-link",
            kwargs={
                "pk_list": list.id,
                "pk": 1
            }
        ),
    )
    assert response.status_code == 204

    url = reverse("lists-detail", kwargs={"pk": list.id})
    response = client.get(url)
    assert response.status_code == 200
    assert response.data.get("name") == list.name
    assert response.data.get("public") is list.public
    assert response.data.get("links") == []
