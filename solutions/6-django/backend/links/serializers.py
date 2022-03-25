from rest_framework import serializers
from links.models import Link
from links.utils import get_page_information


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['url', 'link', 'title', 'description', 'image', 'id']

    def create(self, validated_data):
        request_url = validated_data.get('link')
        page_info = get_page_information(request_url)

        link = Link.objects.create(
            link=page_info.get('link'),
            title=page_info.get('title'),
            description=page_info.get('description'),
            image=page_info.get('image'),
        )
        return link
