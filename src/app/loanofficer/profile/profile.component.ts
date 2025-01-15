import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanOfficerService } from 'src/app/services/loan-officer/loan-officer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userForm: FormGroup;
  disable: boolean = true;
  value: string = "";

  constructor(
    private fb: FormBuilder,
    private loanOfficerService: LoanOfficerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      email: new FormControl({ value: this.value, disabled: true }),
      password: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      contactNumber: new FormControl(),
      pancardNumber: new FormControl(),
      dob: new FormControl(),
      gender: new FormControl()
    });

    this.loanOfficerService.fetchloanOfficer().subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
        this.value = data.email;
      },
      error: (err) => {
        console.error('Error fetching loan officer details:', err);
        this.toastr.error('Failed to load profile details. Please try again.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loanOfficerService.updateLoanOfficer(this.userForm.value).subscribe({
        next: () => {
          this.toastr.success('Profile updated successfully', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl('/login');
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
        }
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
}
