from django.urls import path, include
from rest_framework import routers
from llists import views as list_views
from users import views as user_views
from links import views as link_views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'links', link_views.LinkViewSet)
router.register(r'lists', list_views.LinkListViewSet, basename='lists')

urlpatterns = [
    path('', include(router.urls)),
]
