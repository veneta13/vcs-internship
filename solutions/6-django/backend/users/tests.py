import pytest
from django.urls import reverse
from conftest import anon_client


@pytest.mark.django_db
def test_user_not_found(anon_client):
    url = reverse("auth")
    data = {"username": "notUser", "password": "pass"}
    response = anon_client.post(url, data)
    assert response.status_code == 400


@pytest.mark.django_db
def test_registration(anon_client):
    url = reverse("register-list")
    data = {"username": "testuser1", "password": "test1234"}
    response = anon_client.post(url, data)
    assert response.status_code == 201
    assert response.data == {"username": "testuser1"}


@pytest.mark.django_db
def test_login(anon_client):
    data = {"username": "testuser", "password": "test1234"}
    response = anon_client.post(reverse("register-list"), data)
    assert response.status_code == 201
    assert response.data == {"username": "testuser"}

    response = anon_client.post(reverse("auth"), data)
    assert response.status_code == 200
