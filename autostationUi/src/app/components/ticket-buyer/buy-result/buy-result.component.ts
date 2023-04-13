import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SitePath } from 'src/app/common/constants';

@Component({
  selector: 'app-buy-result',
  templateUrl: './buy-result.component.html',
  styleUrls: ['./buy-result.component.scss']
})
export class BuyResultComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/'+SitePath.TicketBuyer]);
  }, 5000);
  }
}
