from rest_framework import serializers

from .models import DefaultVoyage, Bus, Driver


class VoyageSerializer(serializers.Serializer):
    voyage_number = serializers.PrimaryKeyRelatedField(queryset=DefaultVoyage.objects.all())
    default_voyage = serializers.SerializerMethodField()
    date_departure = serializers.DateField()
    bus_id = serializers.PrimaryKeyRelatedField(queryset=Bus.objects.all())
    bus = serializers.SerializerMethodField()
    driver_id = serializers.PrimaryKeyRelatedField(queryset=Driver.objects.all())
    driver = serializers.SerializerMethodField()
    available_tickets = serializers.IntegerField()

    def get_default_voyage(self, obj):
        dv = obj.voyage_number
        dv_data = DefaultVoyageSerializer(dv).data
        return dv_data

    def get_bus(self, obj):
        bus = obj.bus_id
        bus_data = BusSerializer(bus).data
        return bus_data

    def get_driver(self, obj):
        driver = obj.driver_id
        driver_data = DriverSerializer(driver).data
        return driver_data


class DefaultVoyageSerializer(serializers.Serializer):
    voyage_number = serializers.CharField(max_length=255)
    time_departure = serializers.TimeField()
    end_time_departure = serializers.TimeField()
    days = serializers.IntegerField()
    is_active = serializers.BooleanField(default=True)


class BusSerializer(serializers.Serializer):
    licence_plate = serializers.CharField(max_length=255)
    sit_places = serializers.IntegerField()
    is_broken = serializers.BooleanField(default=False)


class DriverSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=255)
    second_name = serializers.CharField(max_length=255)
    third_name = serializers.CharField(max_length=255)
    illness = serializers.BooleanField(default=False)
    hours_worked = serializers.IntegerField()
