import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$"),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z]+(?:[ -'][A-Za-z]+)*$"),
      ]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[7-9]{1}[0-9]{9}$'),
      ]),
      pancardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
      ]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loginService.register(this.userForm.value).subscribe({
        next: () => {
          this.toastr.success('Customer added successfully', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          if (error.status === 400 && error.error?.message) {
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
