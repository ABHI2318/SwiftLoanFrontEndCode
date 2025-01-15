import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanofficerdashboardComponent } from './loanofficerdashboard/loanofficerdashboard.component';
import { ViewloanrequestComponent } from './viewloanrequest/viewloanrequest.component';
import { ReplytoenquiryComponent } from './replytoenquiry/replytoenquiry.component';
import { ProfileComponent } from './profile/profile.component';
import { PendingloanrequestComponent } from './pendingloanrequest/pendingloanrequest.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoanofficerviewComponent } from './loanofficerview/loanofficerview.component';
import { LoanofficerHeaderComponent } from './loanofficer-header/loanofficer-header.component';


@NgModule({
  declarations: [
    LoanofficerdashboardComponent,
    ViewloanrequestComponent,
    ReplytoenquiryComponent,
    ProfileComponent,
    PendingloanrequestComponent,
    LoanofficerviewComponent,
    LoanofficerHeaderComponent
  ],
  imports: [
    CommonModule,RouterModule,AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule
  ]
})
export class LoanofficerModule { }
