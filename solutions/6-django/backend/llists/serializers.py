from rest_framework import serializers
from llists.models import LinkList
# from links.models import Link
from links.serializers import LinkSerializer


class LinkListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="lists-detail")
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    links = LinkSerializer(many=True)

    class Meta:
        model = LinkList
        fields = ['url', 'owner', 'name', 'public', 'links', 'description']
        extra_kwargs = {"links": {"required": False}}

    def create(self, validated_data):
        validated_data.pop('links', [])
        instance = super().create(validated_data)
        return instance
