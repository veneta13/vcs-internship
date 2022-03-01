from django.contrib.auth.models import User
from llists.models import LinkList
from links.models import Link
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def client(user):
    api_client = APIClient()
    token, _ = Token.objects.get_or_create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    return api_client


@pytest.fixture
def user():
    return User.objects.create(
        username='tester',
        password='123456'
    )


@pytest.fixture
def other_user():
    return User.objects.create(
        username='other',
        password='123456'
    )


@pytest.fixture
def link():
    return Link.objects.create(
        link='http://www.google.com'
    )


@pytest.fixture
def link2():
    return Link.objects.create(
        link='http://www.bing.com'
    )


@pytest.fixture
def empty_list(user):
    return LinkList.objects.create(
      owner=user,
      name='Test List',
      description='Test Description',
      public=True
    )


@pytest.fixture
def list(user, link):
    llist = LinkList.objects.create(
      owner=user,
      name='Test List',
      description='Test Description',
      public=True
    )
    llist.links.set([link])
    return llist


@pytest.fixture
def other_private_list(other_user, link2):
    llist = LinkList.objects.create(
        owner=other_user,
        name='Other List',
        description='Other Description',
        public=False
    )
    llist.links.set([link2])
    return llist


@pytest.fixture
def other_public_list(other_user, link):
    llist = LinkList.objects.create(
        owner=other_user,
        name='Other Public List',
        description='Other Description',
        public=True
    )
    llist.links.set([link])
    return llist
