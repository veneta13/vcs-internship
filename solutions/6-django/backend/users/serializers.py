from django.contrib.auth.models import User, Group
from llists.models import LinkList
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
        optional_fields = ['lists', 'groups', 'email']  # doesn't work
        fields = ['url', 'username', 'email', 'groups', 'lists']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
