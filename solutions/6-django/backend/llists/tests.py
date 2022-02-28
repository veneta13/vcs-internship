import pytest
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


@pytest.fixture
def client(db):
    api_client = APIClient()
    token = Token.objects.get_or_create(user__username='testuser')
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return api_client


# @pytest.fixture
# def list(db):
#     return LinkList.objects.get_or_create(links=[],
#                                           name='Test List',
#                                           description='Test Description',
#                                           public=True)

# reverse('api/lists')

@pytest.mark.django_db
def test_get_list_test(client):
    url = reverse('api-lists')
    response = client.get(url)
    assert response.status_code == 200


# @pytest.mark.django_db
# def test_get_own_list(client):
#     url = reverse('api-lists', kwargs={'pk': 1})
#     response = client.get(url)
#     assert response.status_code == 200
#     assert response.data.get('name') == 'Test List 1'
#     assert response.data.get('public') is True
#     assert response.data.get('links')[0].get('link') == 'http://www.abc.com'
#     assert response.data.get(
#         'description') == 'This is a list description for list 1.'


# @pytest.mark.django_db
# def test_get_private_list(client):
#     response = client.get('http://testserver/api/lists/2/')
#     assert response.status_code == 404


# @pytest.mark.django_db
# def test_get_public_list(client):
#     response = client.get('http://testserver/api/lists/3/')
#     assert response.status_code == 200


# @pytest.mark.django_db
# def test_create_empty_public_list(client):
#     data = {'links': [],
#             'name': 'My public test list',
#             'description': 'This is my test list description',
#             'public': True
#             }
#     response = client.post('http://testserver/api/lists/3/', data)
#     assert response.status_code == 201


# @pytest.mark.django_db
# def test_create_empty_private_list(client):
#     data = {'links': [],
#             'name': 'My private test list',
#             'description': 'This is my test list description',
#             'public': True
#             }
#     response = client.post('http://testserver/api/lists/3/', data)
#     assert response.status_code == 201


# @pytest.mark.django_db
# def test_create_public_list_with_links(client):
#     data = {'links': [],
#             'name': 'My public test list',
#             'description': 'This is my test list description',
#             'public': True
#             }
#     # TODO
#     response = client.post('http://testserver/api/lists/3/', data)
#     assert response.status_code == 201
#     # TODO add another PUT request to the response list URL


# @pytest.mark.django_db
# def test_create_private_list_with_links(client):
#     data = {'links': [],
#             'name': 'My private test list',
#             'description': 'This is my test list description',
#             'public': False
#             }
#     response = client.post('http://testserver/api/lists/3/', data)
#     assert response.status_code == 201
#     # TODO add another PUT request to the response list URL


# @pytest.mark.django_db
# def test_delete_own_list(client):
#     response = client.delete('http://testserver/api/lists/1/')
#     assert response.status_code == 204


# @pytest.mark.django_db
# def test_unsucessfull_deletion_list(client):
#     response = client.delete('http://testserver/api/lists/2/')
#     assert response.status_code == 403


# @pytest.mark.django_db
# def test_list_links(client):
#     response = client.get('http://testserver/api/lists/1/')
#     assert response.status_code == 200
#     # TODO check for link urls as response.data.links objects
