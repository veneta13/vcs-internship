from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from llists.filters import IsOwnerOrPublicFilter
from llists.permissions import IsOwnerOrPublic
from llists.models import LinkList
from llists.serializers import LinkListSerializer

from links.models import Link

class LinkListViewSet(viewsets.ModelViewSet,
                      generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    filter_backends = [IsOwnerOrPublicFilter]
    permission_classes = [IsOwnerOrPublic]


class RemoveLinkViewSet(APIView):
    def delete(self, request, *args, **kwargs):
        llist = LinkList.objects.get(id=kwargs.get('pk_list'))
        link = Link.objects.get(id=kwargs.get('pk'))
        llist.links.remove(link)
        return Response(status=status.HTTP_204_NO_CONTENT)
