from rest_framework import permissions, viewsets
from rest_framework import generics
from django.contrib.auth.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet,
                  generics.ListAPIView,
                  generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (permissions.AllowAny,)
        return super(UserViewSet, self).get_permissions()
