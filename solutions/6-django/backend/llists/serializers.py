from rest_framework import serializers
from llists.models import LinkList
from links.serializers import LinkSerializer


class LinkListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="lists-detail")
    owner = serializers.ReadOnlyField(source='owner.username')
    links = LinkSerializer()

    class Meta:
        model = LinkList
        fields = ['url', 'owner', 'name', 'public', 'links']

    def create(self, validated_data):
        links = validated_data.pop('links', [])
        instance = super().create(validated_data)
        for element in links:
            instance.links.add(link=element)
        return instance
