from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from llists.permissions import IsOwner
from llists.models import LinkList
from llists.serializers import LinkListSerializer


class LinkListViewSet(viewsets.ModelViewSet,
                      generics.ListAPIView,
                      generics.RetrieveAPIView):
    def get_queryset(self):
        return LinkList.objects.filter(owner=self.request.user)
    serializer_class = LinkListSerializer
    permission_classes = [IsOwner & IsAuthenticated]
