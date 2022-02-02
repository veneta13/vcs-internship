from rest_framework import serializers
from llists.models import LinkList
from links.models import Link


class LinkRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Link.objects.get(name=data)


class LinkListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="lists-detail")
    owner = serializers.ReadOnlyField(source='owner.username')
    links = LinkRelatedField(
        many=True,
        queryset=Link.objects.all())

    class Meta:
        model = LinkList
        fields = ['url', 'owner', 'name', 'date', 'public', 'links']
