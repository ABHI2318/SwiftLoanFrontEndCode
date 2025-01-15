import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-loan-scheme',
  templateUrl: './add-loan-scheme.component.html',
  styleUrls: ['./add-loan-scheme.component.css']
})
export class AddLoanSchemeComponent {
  loanSchemeForm: FormGroup;
  errorMessage: string = ''; // Property to store error messages

  constructor(
    private fb: FormBuilder,
    private loanSchemeService: LoanschemeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loanSchemeForm = this.fb.group({
      schemename: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]+$')  // Only alphabets and spaces allowed
      ]),

      maxamount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ]),

      minamount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ]),

      interest: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')  // Only numbers and optional 2 decimal points
      ])
    }, { validators: this.minLessThanMaxValidator });
  }

  // Custom Validator to ensure minamount < maxamount
  minLessThanMaxValidator(group: FormGroup): { [key: string]: boolean } | null {
    const minamount = group.get('minamount')?.value;
    const maxamount = group.get('maxamount')?.value;

    if (minamount && maxamount && minamount >= maxamount) {
      return { 'minLessThanMax': true };
    }
    return null;
  }

  onSubmit() {
    // Reset the error message each time the form is submitted
    this.errorMessage = '';

    if (this.loanSchemeForm.valid) {
      const formData = { ...this.loanSchemeForm.value };

      // Optional: Convert string fields to lowercase if necessary
      for (let key in formData) {
        if (typeof formData[key] === 'string') {
          formData[key] = formData[key].toLowerCase();
        }
      }

      this.loanSchemeService.addloanScheme(formData).subscribe({
        next: (data) => {
          this.toastr.success('Loan scheme added successfully', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl('/admin/viewloanscheme');
        },
        error: (error) => {
          // Assign the error message received from the backend to errorMessage
          this.errorMessage = error;
          this.toastr.error('Failed to add loan scheme. Please try again.', 'Error', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
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
