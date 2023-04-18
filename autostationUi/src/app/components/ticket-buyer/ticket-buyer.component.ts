import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { Voyage } from 'src/app/models/voyage';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-ticket-buyer',
  templateUrl: './ticket-buyer.component.html',
  styleUrls: ['./ticket-buyer.component.scss']
})
export class TicketBuyerComponent implements OnInit{

  isLoading: boolean = true;
  httpOptions: any;
  voyages$: Observable<Array<Voyage>>; 
  today: Date = new Date();
  dt: Date = new Date();

  constructor(private crudService:  CrudService,
    private datePipe: DatePipe){
  }

  ngOnInit(): void {
    this.uploadData();
  }

  uploadData(): void {
    this.isLoading = true;
    this.voyages$ = this.crudService.getByDate<Voyage>(ApiPath.GetVoyagesByDate, 
      this.datePipe.transform(this.dt, 'dd-MM-yyyy') as string).pipe(
      tap(() => this.isLoading = false)
    );
  }
}
