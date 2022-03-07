from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from django.http import HttpRequest
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
        if instance.links.all().filter(
          link=request.data.get('link')) is not []:
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

        return Response(link_serializer.data)


class RemoveLinkViewSet(APIView):
    def delete(self, request, *args, **kwargs):
        llist = LinkList.objects.get(id=kwargs.get('pk_list'))
        link = Link.objects.get(id=kwargs.get('pk'))
        llist.links.remove(link)
        return Response(status=status.HTTP_204_NO_CONTENT)
