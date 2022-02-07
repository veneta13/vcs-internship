from django.urls import path, include
from rest_framework import routers
from users import views as user_views

router = routers.DefaultRouter()
router.register(r'registration', user_views.RegistrationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
