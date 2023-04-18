import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverview } from 'src/app/models/dialog';
import { Voyage } from 'src/app/models/voyage';
import { addDays } from 'src/app/utils/dt-helper';
import { DialogComponent } from '../../dialog/dialog.component';
import { Router } from '@angular/router';
import { SitePath } from 'src/app/common/constants';

@Component({
  selector: 'app-voyage-view',
  templateUrl: './voyage-view.component.html',
  styleUrls: ['./voyage-view.component.scss']
})
export class VoyageViewComponent implements OnInit{

  @Input() voyage: Voyage;
  endDt: Date;
  isChoosed: boolean = false;
  amount: number = 0;
  isActual: boolean = true;
  cost = 100

  constructor(public dialog: MatDialog,
    private router: Router){
  }

  ngOnInit(): void {
    this.checkActuality();
    this.endDt = addDays(this.voyage.date_departure, this.voyage.default_voyage.days);
  }

  checkActuality(): void {
    let dt = new Date();
    let voyageDt = new Date(this.voyage.date_departure.toString() + ' ' + this.voyage.default_voyage.time_departure.toString());
    if (voyageDt < dt || this.voyage.available_tickets < 1) {
      this.isActual = false;
      return;
    }
    this.isActual = true;
  }

  cancel(): void {
    this.amount = 0;
    this.isChoosed = !this.isChoosed;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {type: 1, amount: this.amount, cost: this.cost, voyage: this.voyage}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/'+SitePath.BuyResult]); 
    });
  }
}
