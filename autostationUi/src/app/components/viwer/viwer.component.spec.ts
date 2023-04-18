import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViwerComponent } from './viwer.component';

describe('ViwerComponent', () => {
  let component: ViwerComponent;
  let fixture: ComponentFixture<ViwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViwerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
