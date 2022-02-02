from django.db.models import Q
from rest_framework import filters


class IsOwnerOrPublicFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(Q(owner=request.user) | Q(public=True))
