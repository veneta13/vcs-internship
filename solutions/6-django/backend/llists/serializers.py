from rest_framework import serializers

from llists.models import LinkList
from links.serializers import LinkSerializer


class LinkListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="lists-detail")
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    links = LinkSerializer(read_only=True, many=True)

    class Meta:
        model = LinkList
        fields = [
            'url',
            'owner',
            'name',
            'public',
            'links',
            'description',
            'id'
        ]
