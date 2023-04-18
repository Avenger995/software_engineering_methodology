
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from station import views
from station.views import VoyageViewSet, DriverViewSet, BusViewSet

router = routers.DefaultRouter()
router.register(r'voyage', VoyageViewSet, basename='voyage')
router.register(r'driver', DriverViewSet, basename='driver')
router.register(r'bus', BusViewSet, basename='bus')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/voyages/by_time/<str:date>/', views.VoyageViewSet.as_view({'get': 'by_time'}), name='by_time'),
    path('api/v1/voyages/qr/<str:price>/', views.VoyageViewSet.as_view({'get': 'qr'}), name='qr'),
    path('api/v1/voyages/drivers/', views.VoyageViewSet.as_view({'get': 'allowed_drivers'}), name='allowed_drivers')
]
