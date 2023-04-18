import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TicketBuyerComponent } from './components/ticket-buyer/ticket-buyer.component';
import { SitePath } from './common/constants';
import { BuyResultComponent } from './components/ticket-buyer/buy-result/buy-result.component';
import { ViwerComponent } from './components/viwer/viwer.component';
import { OperatorComponent } from './components/operator/operator.component';
import { DriverEditorComponent } from './components/operator/driver-editor/driver-editor.component';
import { BusEditorComponent } from './components/operator/bus-editor/bus-editor.component';
import { VoyageEditorComponent } from './components/operator/voyage-editor/voyage-editor.component';

const routes: Routes = [
  { path: SitePath.TicketBuyer, component: TicketBuyerComponent },
  { path: SitePath.BuyResult, component: BuyResultComponent },
  { path: SitePath.Viwer, component: ViwerComponent },
  { path: SitePath.Operator, component: OperatorComponent },
  { path: SitePath.DriverEditor, component: DriverEditorComponent },
  { path: SitePath.BusEditor, component: BusEditorComponent },
  { path: SitePath.VoyageEditor, component: VoyageEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
