from rest_framework import permissions, viewsets
from rest_framework import generics
from llists.models import LinkList
from llists.serializers import LinkListSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.ListAPIView,
                      generics.RetrieveAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
