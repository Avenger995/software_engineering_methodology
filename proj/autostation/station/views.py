from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import VoyageSerializer
from .models import Voyage


class VoyageAPIView(APIView):

    def get(self, request):
        w = Voyage.objects.all()
        return Response(VoyageSerializer(w, many=True).data)

