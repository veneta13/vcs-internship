import pytest
from rest_framework.reverse import reverse
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
    url = reverse('register')
    data = {'username': 'testuser1', 'password': 'test1234'}
    response = client.post(url, data)
    assert response.status_code == 201
    assert response.data == {'username': 'testuser1'}


# @pytest.mark.django_db
# def test_login(client):
#     reg_url = '/api/users/registration/'  # TODO reverse
#     data = {'username': 'testuser', 'password': 'test1234'}
#     response = client.post(reg_url, data)
#     assert response.status_code == 201
#     assert response.data == {'username': 'testuser'}

#     # TODO fix login
#     log_url = reverse('auth')
#     response = client.post(log_url, data)
#     assert response.data == ''
