import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanOfficerService } from 'src/app/services/loan-officer/loan-officer.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-loan-officer',
  templateUrl: './add-loan-officer.component.html',
  styleUrls: ['./add-loan-officer.component.css'],
})
export class AddLoanOfficerComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private loanOfficerService: LoanOfficerService,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ), // Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$"), // Allows alphabets and names with spaces or special characters like hyphen/apostrophe
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$"),
      ]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[7-9][0-9]{9}$'), // Validates a 10-digit phone number starting with 7-9
      ]),
      pancardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'), // Validates PAN card format (ABCDE1234F)
      ]),
      dob: new FormControl('', [Validators.required]), // Ensures date of birth is filled
      gender: new FormControl('', [Validators.required]), // Validates gender selection
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loanOfficerService.AddLoanOfficers(this.userForm.value).subscribe({
        next: () => {
          this.toastr.success('Loan Officer added successfully', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl('/admin/admindashboard');
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error && error.error.message) {
            this.toastr.warning(error.error.message, 'Warning', {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right',
            });
          } else {
            this.toastr.error('An unexpected error occurred!', 'Error', {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right',
            });
          }
        },
      });
    } else {
      this.toastr.warning('Please fill out the form correctly.', 'Warning', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    }
  }

  // Getters for form controls
  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get contactNumber() {
    return this.userForm.get('contactNumber');
  }

  get pancardNumber() {
    return this.userForm.get('pancardNumber');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get gender() {
    return this.userForm.get('gender');
  }
}
