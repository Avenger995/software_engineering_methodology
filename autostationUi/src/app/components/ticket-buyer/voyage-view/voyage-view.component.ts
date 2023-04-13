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

  constructor(public dialog: MatDialog,
    private router: Router){
  }

  ngOnInit(): void {
    this.endDt = addDays(this.voyage.date_departure, this.voyage.default_voyage.days);
  }

  cancel(): void {
    this.amount = 0;
    this.isChoosed = !this.isChoosed;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {type: 1, qr: 'https://material.angular.io/components/dialog/overview'}
    })

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/'+SitePath.BuyResult]);
    });
  }
}
