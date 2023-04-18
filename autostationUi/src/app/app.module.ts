import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandlerDescriptor } from './services/error-handling/error-handler-descriptor';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { TicketBuyerComponent } from './components/ticket-buyer/ticket-buyer.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VoyageViewComponent } from './components/ticket-buyer/voyage-view/voyage-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { BuyResultComponent } from './components/ticket-buyer/buy-result/buy-result.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { APP_DATE_FORMATS, AppDateAdapter } from './utils/date.adapter';
import { ViwerComponent } from './components/viwer/viwer.component';
import { OperatorComponent } from './components/operator/operator.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { DriverEditorComponent } from './components/operator/driver-editor/driver-editor.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BusEditorComponent } from './components/operator/bus-editor/bus-editor.component';
import { VoyageEditorComponent } from './components/operator/voyage-editor/voyage-editor.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobalErrorComponent,
    TicketBuyerComponent,
    VoyageViewComponent,
    DialogComponent,
    BuyResultComponent,
    ViwerComponent,
    OperatorComponent,
    NavBarComponent,
    DriverEditorComponent,
    BusEditorComponent,
    VoyageEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [ErrorHandlerDescriptor,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: AppDateAdapter },],
  bootstrap: [AppComponent]
})
export class AppModule { }
