from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrPublic(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or (
            obj.public and (request.method in SAFE_METHODS))
