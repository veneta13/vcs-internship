from django.contrib.auth.models import User
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create(username='tester', password='123456')


@pytest.fixture
def client(user):
    api_client = APIClient()
    token, _ = Token.objects.get_or_create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return api_client
