import base64
from datetime import datetime
import io

import qrcode
from django.http import JsonResponse
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import VoyageSerializer, DriverSerializer, BusSerializer
from .models import Voyage, Driver, Bus


class BusViewSet(mixins.CreateModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.ListModelMixin,
                 mixins.DestroyModelMixin,
                 GenericViewSet):
    serializer_class = BusSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if not pk:
            return Bus.objects.all()
        return Bus.objects.filter(pk=pk)


class DriverViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    GenericViewSet):
    serializer_class = DriverSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if not pk:
            return Driver.objects.all()
        return Driver.objects.filter(pk=pk)


class VoyageViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    GenericViewSet):
    serializer_class = VoyageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if not pk:
            return Voyage.objects.all()
        return Voyage.objects.filter(pk=pk)

    @action(methods=['get'], detail=True)
    def by_time(self, requset, date):
        qs = Voyage.objects.filter(date_departure=datetime.strptime(date, '%d-%m-%Y').date())
        return JsonResponse(VoyageSerializer(qs, many=True).data, safe=False)

    @action(methods=['get'], detail=True)
    def qr(self, requset, price):
        string = 'Pay some: {}'.format(str(price))
        img = qrcode.make(string)
        temp = io.BytesIO()
        img.save(temp)
        img_b64 = base64.b64encode(temp.getvalue()).decode('utf-8')
        data = {'img': img_b64}
        return Response(data)

