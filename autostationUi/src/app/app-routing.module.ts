import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TicketBuyerComponent } from './components/ticket-buyer/ticket-buyer.component';
import { SitePath } from './common/constants';
import { BuyResultComponent } from './components/ticket-buyer/buy-result/buy-result.component';

const routes: Routes = [
  { path: SitePath.TicketBuyer, component: TicketBuyerComponent },
  { path: SitePath.BuyResult, component: BuyResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
