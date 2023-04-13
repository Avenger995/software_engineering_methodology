import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageViewComponent } from './voyage-view.component';

describe('VoyageViewComponent', () => {
  let component: VoyageViewComponent;
  let fixture: ComponentFixture<VoyageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
