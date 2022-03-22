from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from llists.filters import IsOwnerOrPublicFilter
from llists.permissions import IsOwnerOrPublic
from llists.models import LinkList
from llists.serializers import LinkListSerializer

from links.models import Link
from links.serializers import LinkSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    filter_backends = [IsOwnerOrPublicFilter]
    permission_classes = [IsOwnerOrPublic]

    def partial_update(self, request, *args, **kwargs):
        new_link, created = Link.objects.update_or_create(
            link=request.data.get('link'),
            defaults={'link': request.data.get('link')},
        )

        instance = self.get_object()
        instance.links.add(new_link)
        instance.save()

        link_serializer = LinkSerializer(
            new_link,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        link_serializer.is_valid(raise_exception=True)
        self.perform_update(link_serializer)

        return Response(dict(link_serializer.data))

    def create_or_update_links(self, links):
        new_links = []
        for current_link in links:
            link_instance, created = Link.objects.update_or_create(
                link=current_link,
                defaults={'link': current_link},
            )
            new_links.append(link_instance)
        return new_links

    def update(self, request, *args, **kwargs):
        instance = LinkList.objects.get(id=kwargs.get('pk'))
        all_links = dict(request.data).get('links')
        instance.links.set(self.create_or_update_links(all_links))
        fields = [
            'name',
            'public',
            'description'
        ]
        for field in fields:
            setattr(instance, field, request.data[field])

        instance.save()
        list_serializer = LinkListSerializer(
            instance,
            data=request.data,
            partial=False,
            context={'request': request}
        )
        list_serializer.is_valid(raise_exception=True)
        self.perform_update(list_serializer)

        return Response(dict(list_serializer.data))


class RemoveLinkViewSet(APIView):
    def delete(self, request, *args, **kwargs):
        llist = LinkList.objects.get(id=kwargs.get('pk_list'))
        link = Link.objects.get(id=kwargs.get('pk'))
        llist.links.remove(link)
        return Response(status=status.HTTP_204_NO_CONTENT)
