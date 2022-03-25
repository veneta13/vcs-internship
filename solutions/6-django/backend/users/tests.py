import pytest
from django.urls import reverse
from conftest import anon_client, user


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
def test_login(anon_client, user):
    data = {"username": "tester", "password": "123456"}
    response = anon_client.post(reverse("auth"), data)
    assert response.status_code == 200
