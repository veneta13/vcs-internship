from rest_framework import viewsets
from rest_framework import generics
from llists.filters import IsOwnerOrPublicFilter
from llists.permissions import IsOwnerOrPublic
from llists.models import LinkList
from llists.serializers import LinkListSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.ListAPIView,
                      generics.RetrieveAPIView):
    queryset = LinkList.objects.all()
    serializer_class = LinkListSerializer
    filter_backends = [IsOwnerOrPublicFilter]
    permission_classes = [IsOwnerOrPublic]
