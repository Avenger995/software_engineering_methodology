import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { Bus } from 'src/app/models/bus';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-bus-editor',
  templateUrl: './bus-editor.component.html',
  styleUrls: ['./bus-editor.component.scss']
})
export class BusEditorComponent implements OnInit {

  addForm = new FormGroup( {
    licence_plate: new FormControl<string>('', [Validators.required]),
    sit_places: new FormControl<number>(0, [Validators.required]),   
    is_broken: new FormControl<boolean>(false)
  });

  buses$: Observable<Array<Bus>>;
  isLoading: boolean = true;
  activated: number = 0;
  currentBus: Bus = {
    id: 0,
    licence_plate: '',
    sit_places: 0,
    is_broken: false
  }; 

  constructor(private crudService:  CrudService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  addNewBus(): void {
    this.isLoading = true;
    this.crudService.post<Bus, Bus>(ApiPath.Bus, this.busModelConstructor()).subscribe(() => {
      this.isLoading = false;
      this.getData();
    });
  }

  deleteBus(id: number | undefined): void {
    this.isLoading = true;
    this.crudService.delete<Bus>(ApiPath.Bus, id as number).subscribe(() => {
      this.isLoading = false;
      this.getData();
    });
  }

  updateBus(): void {
    this.isLoading = true;
    this.crudService.update<Bus, Bus>(ApiPath.Bus, this.currentBus.id?.toString() as string, this.currentBus).subscribe(() => {
      this.isLoading = false;
      this.getData();
    })
  }

  activateBus(bus: Bus, index: number) {
    this.activated = index;
    this.currentBus = bus;
  }

  getData(): void {
    this.activated = 0;
    this.setAddForm();
    this.isLoading = true;
    this.buses$ = this.crudService.getAll<Bus>(ApiPath.Bus).pipe(
      tap(() => this.isLoading = false)
    );
  }

  busModelConstructor(): Bus {
    return {
      licence_plate: this.addForm.controls['licence_plate'].value as string,
      sit_places: this.addForm.controls['sit_places'].value as number,
      is_broken: (this.addForm.controls['is_broken'].value as boolean)
    }
  }

  get isBroken() {
    return this.addForm.value.is_broken;
  }

  setAddForm(): void {
    this.addForm = new FormGroup( {
      licence_plate: new FormControl<string>('', [Validators.required]),
      sit_places: new FormControl<number>(0, [Validators.required]),   
      is_broken: new FormControl<boolean>(false)
    });
  }

}
