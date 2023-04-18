import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { DialogData, DialogOverview } from 'src/app/models/dialog';
import { Img } from 'src/app/models/img';
import { Voyage } from 'src/app/models/voyage';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  isLoading: boolean = false;
  img: Img;

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private crudService: CrudService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.data.type === 1) {
      this.crudService.getQr(ApiPath.GetQr, (this.data.amount*this.data.cost).toString())
      .subscribe(result => {
        this.isLoading = false;
        this.img = result;
      });
    }
  }

  get imgDecode() {
    return 'data:image/png;base64, ' + this.img.img;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    let newVoy = this.data.voyage;
    newVoy.available_tickets = newVoy.available_tickets - this.data.amount;
    this.crudService.update<Voyage, Voyage>(ApiPath.GetAllVoyages, 
      this.data.voyage.id.toString(), newVoy).subscribe(() => 
      this.dialogRef.close(true)
    );
  }
}
