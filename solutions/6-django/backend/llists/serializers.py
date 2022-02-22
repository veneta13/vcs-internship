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
        fields = ['url', 'owner', 'name', 'public', 'links']

    def create(self, validated_data):
        links = validated_data.pop('links', [])
        instance = super().create(validated_data)
        for item in links:
            # link = Link.objects.create(link=item)
            # instance.links.add(link)
            instance.links.create(link=item)
        return instance
