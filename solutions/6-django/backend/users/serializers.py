from django.contrib.auth.models import User, Group
from links_list.models import LinkList
from rest_framework import serializers


class ListsRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return LinkList.objects.get(name=data)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    lists = ListsRelatedField(
        many=True,
        queryset=LinkList.objects.all())

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'lists']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
