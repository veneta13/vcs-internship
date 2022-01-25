from rest_framework import permissions, viewsets
from rest_framework import generics
from links_list.models import LinkList
from links_list.serializers import LinkListSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.ListAPIView,
                      generics.RetrieveAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
