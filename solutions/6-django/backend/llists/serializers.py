from rest_framework import serializers
from llists.models import LinkList
from links.serializers import LinkSerializer


class LinkListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="lists-detail")
    owner = serializers.ReadOnlyField(source='owner.username')
    links = LinkSerializer()

    class Meta:
        model = LinkList
        fields = ['url', 'owner', 'name', 'date', 'public', 'links']
