from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from llists.filters import IsOwnerOrPublicFilter
from llists.permissions import IsOwnerOrPublic
from llists.models import LinkList
from links.models import Link
from llists.serializers import LinkListSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    filter_backends = [IsOwnerOrPublicFilter]
    permission_classes = [IsOwnerOrPublic]


class RemoveLinkViewSet(viewsets.ModelViewSet,
                        generics.DestroyAPIView):

    def destroy(self, request, list_id, link_id):
        list = LinkList.objects.get(id=list_id)
        list['links'] = [x for x in list['links'] if x.id != link_id]
        return Response(status_code=status.HTTP_204_NO_CONTENT)
