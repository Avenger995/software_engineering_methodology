import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyResultComponent } from './buy-result.component';

describe('BuyResultComponent', () => {
  let component: BuyResultComponent;
  let fixture: ComponentFixture<BuyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
