from rest_framework import serializers
from links.models import Link


class LinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Link
        fields = ['url', 'link']
