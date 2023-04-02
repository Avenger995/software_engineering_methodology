from django.shortcuts import render
from rest_framework import generics

from .serializers import VoyageSerializer
from .models import Voyage

# Create your views here.


class VoyageAPIView(generics.ListAPIView):
    queryset = Voyage.objects.all()
    serializer_class = VoyageSerializer
