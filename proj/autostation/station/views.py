import json
from datetime import datetime

from django.http import JsonResponse, HttpResponse
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django.db.models import F

from . import serializers
from .serializers import VoyageSerializer
from .models import Voyage


class VoyageViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    GenericViewSet):
    serializer_class = VoyageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if not pk:
            return Voyage.objects.all()
        return Voyage.objects.filter(pk=pk)

    @action(methods=['get'], detail=True)
    def by_time(self, requset, date):
        qs = Voyage.objects.filter(date_departure=datetime.strptime(date, '%d-%m-%Y').date())
        return JsonResponse(VoyageSerializer(qs, many=True).data, safe=False)

