import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBuyerComponent } from './ticket-buyer.component';

describe('TicketBuyerComponent', () => {
  let component: TicketBuyerComponent;
  let fixture: ComponentFixture<TicketBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
