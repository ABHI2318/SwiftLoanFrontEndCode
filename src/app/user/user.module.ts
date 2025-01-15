import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { LoanschemesComponent } from './loanschemes/loanschemes.component';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentComponent } from './payment/payment.component'; 
import { FormsModule } from '@angular/forms';
import { QueriesComponent } from './queries/queries.component';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { AllappliedloanComponent } from './allappliedloan/allappliedloan.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ViewemiComponent } from './viewemi/viewemi.component';

import { NgxSearchFilterModule } from 'ngx-search-filter';
import { ViewactiveloansComponent } from './viewactiveloans/viewactiveloans.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { UserviewComponent } from './userview/userview.component';
import { UserHeaderComponent } from './user-header/user-header.component';

 
@NgModule({
  declarations: [
    UserdashboardComponent,
    LoanschemesComponent,
    PaymentComponent,
    QueriesComponent,
    ApplyloanComponent,
    AllappliedloanComponent,
    UpdateprofileComponent,
    ViewemiComponent,
    ViewactiveloansComponent,
    CalculatorComponent,
    UserviewComponent,
    UserHeaderComponent
   
  ],
  imports: [
    CommonModule,RouterModule,AppRoutingModule,ReactiveFormsModule,FormsModule,NgxSearchFilterModule, 
    HttpClientModule
  ],
  
})
export class UserModule { }
