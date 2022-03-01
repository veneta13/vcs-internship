import pytest
from django.urls import reverse
import conftest


# @pytest.mark.django_db
# def test_list_lists(client, list):
#     response = client.get(reverse('lists-list'))
#     assert response.status_code == 200
#     assert response.data['results'][0]['name'] == 'Test List'
#     assert response.data['results'][0]['description'] == 'Test Description'
#     assert response.data['results'][0]['public'] is True


# @pytest.mark.django_db
# def test_get_own_list(client, list):
#     url = reverse('lists-detail', kwargs={'pk': 1})
#     response = client.get(url)
#     assert response.status_code == 200
#     assert response.data.get('name') == 'Test List'
#     assert response.data.get('public') is True
#     assert response.data.get('links')[0].get('link') == 'http://www.google.com'
#     assert response.data.get('description') == 'Test Description'


# @pytest.mark.django_db
# def test_get_private_list(client, list, other_private_list):
#     url = reverse('lists-detail', kwargs={'pk': 2})
#     response = client.get(url)
#     assert response.status_code == 404


# @pytest.mark.django_db
# def test_get_public_list(client, list, other_public_list):
#     url = reverse('lists-detail', kwargs={'pk': 2})
#     response = client.get(url)
#     assert response.status_code == 200
#     assert response.data.get('name') == 'Other Public List'
#     assert response.data.get('description') == 'Other Description'
#     assert response.data.get('public') is True


# @pytest.mark.django_db
# def test_create_empty_public_list(client):
#     response = client.post(
#         reverse('lists-list'),
#         {
#             'name': 'My public test list',
#             'description': 'Test list description',
#             'public': True
#         }
#     )
#     assert response.status_code == 201
#     assert response.data.get('name') == 'My public test list'
#     assert response.data.get('description') == 'Test list description'
#     assert response.data.get('public') is True


# @pytest.mark.django_db
# def test_create_empty_private_list(client):
#     response = client.post(
#         reverse('lists-list'),
#         {
#             'name': 'My private test list',
#             'description': 'Test list description',
#             'public': False
#         }
#     )
#     assert response.status_code == 201
#     assert response.data.get('name') == 'My private test list'
#     assert response.data.get('description') == 'Test list description'
#     assert response.data.get('public') is False


# @pytest.mark.django_db
# def test_add_links_to_public_list(client):
#     response = client.post(
#         reverse('lists-list'),
#         {
#             'name': 'My public test list',
#             'description': 'Test list description',
#             'public': True
#         }
#     )
#     assert response.status_code == 201

#     links = ['https://www.google.com', 'https://www.example.com']

#     for currentLink in links:
#         new_resp = client.patch(response.data['url'], {'link': currentLink})
#         assert new_resp.status_code == 200


# @pytest.mark.django_db
# def test_add_links_to_private_list(client):
#     response = client.post(
#         reverse('lists-list'),
#         {
#             'name': 'My public test list',
#             'description': 'This is my test list description',
#             'public': False
#         }
#     )
#     assert response.status_code == 201

#     links = ['https://www.google.com', 'https://www.example.com']

#     for currentLink in links:
#         new_resp = client.patch(response.data['url'], {'link': currentLink})
#         assert new_resp.status_code == 200


# @pytest.mark.django_db
# def test_delete_own_list(client, list):
#     url = reverse('lists-detail', kwargs={'pk': 1})
#     response = client.delete(url)
#     assert response.status_code == 204


# @pytest.mark.django_db
# def test_unsucessfull_deletion_private_list(client, list, other_private_list):
#     url = reverse('lists-detail', kwargs={'pk': 2})
#     response = client.delete(url)
#     assert response.status_code == 404


# @pytest.mark.django_db
# def test_unsucessfull_deletion_public_list(client, list, other_public_list):
#     url = reverse('lists-detail', kwargs={'pk': 2})
#     response = client.delete(url)
#     assert response.status_code == 403


@pytest.mark.django_db
def test_delete_single_link(client):
    response = client.post(
        reverse('lists-list'),
        {
            'name': 'My public test list',
            'description': 'This is my test list description',
            'public': False
        }
    )
    assert response.status_code == 201

    links = ['https://www.google.com', 'https://www.example.com']

    for currentLink in links:
        new_resp = client.patch(response.data['url'], {'link': currentLink})
        assert new_resp.status_code == 200

    response = client.delete(
        reverse(
            'delete-link-detail',
            kwargs={
                    'pk_list': 1,
                    'pk': 1
                }
        ),
    )
    assert response.status_code == 204
