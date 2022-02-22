from rest_framework import permissions, viewsets
from rest_framework import generics
from links.serializers import LinkSerializer
from links.models import Link


class LinkViewSet(viewsets.ModelViewSet,
                  generics.ListAPIView,
                  generics.RetrieveAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
