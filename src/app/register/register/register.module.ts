import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule
  ],
  providers: [LoginService]
})
export class RegisterModule { }
