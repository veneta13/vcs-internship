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

    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        write_only_fields = ['password']
        fields = ['username', 'password']

    def create(self, validated_data):
        user = super(RegistrationSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
