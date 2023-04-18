import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { Voyage } from 'src/app/models/voyage';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-viwer',
  templateUrl: './viwer.component.html',
  styleUrls: ['./viwer.component.scss']
})
export class ViwerComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  voyages$: Observable<Voyage[]>
  now: Date = new Date();

  private timeOut: any
  private changeTime: number = 30;

  constructor(private crudService: CrudService) {

  }
  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }

  ngOnInit(): void {
    this.infiniteLoopRecall(this.changeTime);
  }

  uploadData(): void {
    this.isLoading = true;
    this.voyages$ = this.crudService.getAll<Voyage>(ApiPath.GetAllVoyages).pipe(
      tap(() => this.isLoading = false)
    );
  }

  fullDate(voyage: Voyage): Date {
    return  new Date(voyage.date_departure.toString() + ' ' + voyage.default_voyage.time_departure.toString())
  }

  private infiniteLoopRecall(delay: number, func?: Function): void {
    const toMs = delay * 1000;
    this.uploadData();
    this.timeOut = setTimeout(() => {
      this.infiniteLoopRecall(delay);
    }, toMs);
  }
}
