from abc import ABC

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import DefaultVoyage, Bus, Driver, Voyage


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        groups = self.user.groups.values_list('name', flat=True)
        data['groups'] = groups
        return data


class VoyageSerializer(serializers.ModelSerializer):
    voyage_number = serializers.PrimaryKeyRelatedField(queryset=DefaultVoyage.objects.all())
    driver_id = serializers.PrimaryKeyRelatedField(queryset=Driver.objects.all())
    bus_id = serializers.PrimaryKeyRelatedField(queryset=Bus.objects.all())
    default_voyage = serializers.SerializerMethodField()
    bus = serializers.SerializerMethodField()
    driver = serializers.SerializerMethodField()

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

    class Meta:
        model = Voyage
        fields = "__all__"


class DefaultVoyageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultVoyage
        fields = "__all__"


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = "__all__"


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = "__all__"