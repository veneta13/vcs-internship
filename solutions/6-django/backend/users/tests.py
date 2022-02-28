import pytest
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.fixture
def client():
    return APIClient()


@pytest.mark.django_db
def test_user_not_found(client):
    url = reverse('auth')
    data = {'username': 'notUser', 'password': 'pass'}
    response = client.post(url, data)
    assert response.status_code == 400


@pytest.mark.django_db
def test_registration(client):
    # url = '/api/users/registration/'  # TODO reverse
    url = reverse('register-list')
    data = {'username': 'testuser1', 'password': 'test1234'}
    response = client.post(url, data)
    assert response.status_code == 201
    assert response.data == {'username': 'testuser1'}

from django.contrib.auth.models import User

@pytest.mark.django_db
def test_login(client):
    data = {'username': 'testuser', 'password': 'test1234'}
    response = client.post(reverse('register-list'), data)
    assert response.status_code == 201
    assert response.data == {'username': 'testuser'}

    # TODO fix login
    response = client.post(reverse('auth'), data)
    assert response.data == ''
