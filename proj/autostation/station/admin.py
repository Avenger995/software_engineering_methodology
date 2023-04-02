from django.contrib import admin

from .models import DefaultVoyage, Bus, Driver, Voyage

admin.site.register(DefaultVoyage)
admin.site.register(Bus)
admin.site.register(Driver)
admin.site.register(Voyage)
