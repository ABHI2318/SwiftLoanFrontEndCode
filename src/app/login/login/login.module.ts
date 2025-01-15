import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ServicesModule } from 'src/app/services/services.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,AppRoutingModule,ServicesModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
