from rest_framework import serializers

from .models import Voyage


class VoyageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voyage
        fields = ('date_departure', 'available_tickets', 'bus_id_id', 'driver_id_id', 'voyage_number_id')
