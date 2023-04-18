import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { Bus } from 'src/app/models/bus';
import { Driver } from 'src/app/models/driver';
import { Voyage } from 'src/app/models/voyage';
import { CrudService } from 'src/app/services/crud/crud.service';
import { addDays } from 'src/app/utils/dt-helper';

@Component({
  selector: 'app-voyage-editor',
  templateUrl: './voyage-editor.component.html',
  styleUrls: ['./voyage-editor.component.scss']
})
export class VoyageEditorComponent implements OnInit {

  voyages$: Observable<Array<Voyage>>;
  isLoading: boolean = true;
  activated: number = 0;  
  today: Date = new Date();
  dt: Date = new Date();
  workingHours: number = 60;

  allowDrivers: Array<Driver> = []
  allowBuses: Array<Bus> = []

  allVoyages: Array<Voyage> = []
  allDrivers: Array<Driver> = []
  allBuses: Array<Bus> = []

  newVoyage: Voyage;

  constructor(private crudService:  CrudService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getData();
  }

  uploadData(): void {
    this.isLoading = true;
    this.crudService.update<Voyage, Voyage>(ApiPath.GetAllVoyages, this.newVoyage.id.toString(), this.newVoyage).subscribe(() => {
      this.getData();
    })
  }

  getData(): void {
    this.activated = 0;
    this.getAllVoyages();
    this.getAllBuses();
    this.getAllDriver();
    this.getVoyagesAsync();
  }

  getVoyagesAsync(): void {
    this.voyages$ = this.crudService.getByDate<Voyage>(ApiPath.GetVoyagesByDate, 
      this.datePipe.transform(this.dt, 'dd-MM-yyyy') as string).pipe(
      tap(() => this.isLoading = false)
    );
  }

  prepareNewVoyage(voyage: Voyage, index: number) {
    this.activated = index + 1;
    this.newVoyage = voyage;
    this.getAllowedDriversAndBusesData(this.newVoyage);
  }

  getAllowedDriversAndBusesData(voyage: Voyage) {
    const startDt = moment(voyage.date_departure + ' ' + voyage.default_voyage.time_departure);
    this.fillAllowBuses(startDt);
    this.fillAllowDrivers(startDt);
  }

  fillAllowBuses(startDt: moment.Moment) {
    this.allowBuses = []
    this.allBuses.forEach(x => {
      let canAllow = true;
      let voyages = this.allVoyages.filter(x => x.bus.id == x.id);
      voyages.forEach(y => {
        let endDt = moment(addDays(new Date(y.date_departure), y.default_voyage.days) + ' ' + y.default_voyage.end_time_departure);
        if (endDt >= startDt) {
          canAllow = false;
        };
      });
      if (canAllow == true) this.allowBuses.push(x);
    });
  }

  fillAllowDrivers(startDt: moment.Moment) {
    this.allowDrivers = []
    this.allDrivers.forEach(x => {
      let canAllow = true;
      let voyages = this.allVoyages.filter(x => x.driver.id == x.id);
      voyages.forEach(y => {
        let endDt = moment(addDays(new Date(y.date_departure), y.default_voyage.days) + ' ' + y.default_voyage.end_time_departure);
        if (endDt >= startDt) {
          canAllow = false;
        };
      });
      if (canAllow == true && x.hours_worked as number <= this.workingHours) this.allowDrivers.push(x);
    });
  }

  getAllBuses() {
    this.isLoading = true;
    this.crudService.getAll<Bus>(ApiPath.Bus).subscribe(result => {
      this.allBuses = result;
      this.isLoading = false;
    });
  }

  getAllDriver() {
    this.isLoading = true;
    this.crudService.getAll<Driver>(ApiPath.Driver).subscribe(result => {
      this.allDrivers = result;
      this.isLoading = false;
    });
  }

  getAllVoyages() {
    this.isLoading = true;
    this.crudService.getAll<Voyage>(ApiPath.GetAllVoyages).subscribe(result => {
      this.allVoyages = result;
      this.isLoading = false;
    });
  }
}
