import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header/admin-header.component';
import { AdminViewComponent } from './admin-view/admin-view/admin-view.component';
import { AddLoanOfficerComponent } from './admin-loanOfficer/add-loan-officer/add-loan-officer.component';
import { ViewLoanOfficerComponent } from './admin-view-loanOfficer/view-loan-officer/view-loan-officer.component';
import { ViewLoanSchemeComponent } from './admin-view-loanScheme/view-loan-scheme/view-loan-scheme.component';
import { AddLoanSchemeComponent } from './add-loan-scheme/add-loan-scheme/add-loan-scheme.component';
import { UpdateLoanSchemeComponent } from './admin-update-loanScheme/update-loan-scheme/update-loan-scheme.component';
import { ViewNpaComponent } from './view-npa/view-npa/view-npa.component';
import { ViewLoanofficerReportComponent } from './view-loanOfficer-report/view-loanofficer-report/view-loanofficer-report.component';
import { ViewCustomerComponent } from './view-customer/view-customer/view-customer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { ViewLoanRequestComponent } from './view-loan-request/view-loan-request/view-loan-request.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminViewComponent,
    AddLoanOfficerComponent,
    ViewLoanOfficerComponent,
    ViewLoanSchemeComponent,
    AddLoanSchemeComponent,
    UpdateLoanSchemeComponent,
    ViewNpaComponent,
    ViewLoanofficerReportComponent,
    ViewCustomerComponent,
    ViewLoanRequestComponent
  ],
  imports: [
    CommonModule,AppRoutingModule,ReactiveFormsModule,FormsModule,NgxSearchFilterModule, HttpClientModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
