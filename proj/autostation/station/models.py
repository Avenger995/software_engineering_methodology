from django.db import models


class DefaultVoyage(models.Model):
    voyage_number = models.CharField(max_length=255)
    time_departure = models.DateTimeField()
    end_time_departure = models.DateTimeField()
    days = models.PositiveSmallIntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.voyage_number


class Bus(models.Model):
    licence_plate = models.CharField(max_length=255)
    sit_places = models.PositiveSmallIntegerField()
    is_broken = models.BooleanField(default=False)

    def __str__(self):
        return self.licence_plate


class Driver(models.Model):
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255)
    third_name = models.CharField(max_length=255)
    illness = models.BooleanField(default=False)
    hours_worked = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.second_name


class Voyage(models.Model):
    voyage_number = models.ForeignKey('DefaultVoyage', on_delete=models.PROTECT, null=False)
    date_departure = models.DateField()
    bus_id = models.ForeignKey('Bus', on_delete=models.PROTECT, null=False)
    driver_id = models.ForeignKey('Driver', on_delete=models.PROTECT, null=False)
    availableTickets = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.voyage_number



