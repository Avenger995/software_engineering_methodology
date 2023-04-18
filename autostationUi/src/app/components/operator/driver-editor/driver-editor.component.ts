import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ApiPath } from 'src/app/common/constants';
import { Driver } from 'src/app/models/driver';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-driver-editor',
  templateUrl: './driver-editor.component.html',
  styleUrls: ['./driver-editor.component.scss']
})
export class DriverEditorComponent implements OnInit {

  addForm = new FormGroup( {
    first_name: new FormControl<string>('', [Validators.required]),
    second_name: new FormControl<string>('', [Validators.required]),    
    third_name: new FormControl<string>('', [Validators.required]),
    illness: new FormControl<boolean>(false)
  });

  drivers$: Observable<Array<Driver>>;
  isLoading: boolean = true;
  activated: number = 0;
  currentDriver: Driver = {
    id: 0,
    first_name: '',
    second_name: '',
    third_name: '',
    illness: false,
    hours_worked: 0
  }; 

  constructor(private crudService:  CrudService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  addNewDriver(): void {
    this.isLoading = true;
    this.crudService.post<Driver, Driver>(ApiPath.Driver, this.driverModelConstructor()).subscribe(() => {
      this.isLoading = false;
      this.getData();
    });
  }

  deleteDrvier(id: number | undefined): void {
    this.isLoading = true;
    this.crudService.delete<Driver>(ApiPath.Driver, id as number).subscribe(() => {
      this.isLoading = false;
      this.getData();
    });
  }

  updateDriver(): void {
    this.isLoading = true;
    this.currentDriver.illness = !this.currentDriver.illness;
    this.crudService.update<Driver, Driver>(ApiPath.Driver, this.currentDriver.id?.toString() as string, this.currentDriver).subscribe(() => {
      this.isLoading = false;
      this.getData();
    })
  }

  activateDriver(driver: Driver, index: number) {
    this.activated = index;
    this.currentDriver = driver;
    this.currentDriver.illness = !this.currentDriver.illness; 
  }

  getData(): void {
    this.activated = 0;
    this.setAddForm();
    this.isLoading = true;
    this.drivers$ = this.crudService.getAll<Driver>(ApiPath.Driver).pipe(
      tap(() => this.isLoading = false)
    );
  }

  driverModelConstructor(): Driver {
    return {
      first_name: this.addForm.controls['first_name'].value as string,
      second_name: this.addForm.controls['second_name'].value as string,
      third_name: this.addForm.controls['third_name'].value as string,
      illness: !(this.addForm.controls['illness'].value as boolean),
      hours_worked: 0
    }
  }

  get illness() {
    return this.addForm.value.illness;
  }

  setAddForm(): void {
    this.addForm = new FormGroup( {
      first_name: new FormControl<string>('', [Validators.required]),
      second_name: new FormControl<string>('', [Validators.required]),    
      third_name: new FormControl<string>('', [Validators.required]),
      illness: new FormControl<boolean>(false)
    });
  }
}
