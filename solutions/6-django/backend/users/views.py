from rest_framework import permissions, viewsets
from rest_framework import generics
from django.contrib.auth.models import User
from users.serializers import UserSerializer, RegistrationSerializer
from users.permissions import PostOnly


class UserViewSet(viewsets.ModelViewSet,
                  generics.ListAPIView,
                  generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegistrationViewSet(viewsets.ModelViewSet,
                          generics.ListAPIView,
                          generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = RegistrationSerializer
    permissions = [PostOnly]
