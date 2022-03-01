from django.urls import path, re_path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from llists import views as list_views
from users import views as user_views
from links import views as link_views

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'links', link_views.LinkViewSet)
router.register(r'lists', list_views.LinkListViewSet, basename='lists')

urlpatterns = [
    path('auth/', obtain_auth_token, name='auth'),
    path('users/', include('users.urls')),
    path('', include(router.urls)),
    re_path(
        r'lists/(?P<pk_list>\d+)/(?P<pk>\d+)/$',
        list_views.RemoveLinkViewSet.as_view(),
        name='delete-link'
    )
]
