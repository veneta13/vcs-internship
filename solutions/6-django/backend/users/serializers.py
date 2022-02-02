from django.contrib.auth.models import User, Group
from rest_framework import serializers
from llists.serializers import LinkListSerializer


class UserSerializer(serializers.ModelSerializer):
    lists = LinkListSerializer()

    class Meta:
        read_only_field = ['lists']
        model = User
        fields = ['url', 'username', 'email', 'groups', 'lists']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
