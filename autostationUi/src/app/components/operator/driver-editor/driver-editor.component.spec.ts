import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditorComponent } from './driver-editor.component';

describe('DriverEditorComponent', () => {
  let component: DriverEditorComponent;
  let fixture: ComponentFixture<DriverEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
