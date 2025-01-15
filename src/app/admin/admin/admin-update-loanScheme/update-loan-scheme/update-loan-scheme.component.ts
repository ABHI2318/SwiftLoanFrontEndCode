import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-loan-scheme',
  templateUrl: './update-loan-scheme.component.html',
  styleUrls: ['./update-loan-scheme.component.css']
})
export class UpdateLoanSchemeComponent {
  loanSchemeForm: FormGroup;
  schemeId: any = "";
  @Input() id: any = "";

  constructor(
    private fb: FormBuilder,
    private loanSchemeService: LoanschemeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loanSchemeForm = this.fb.group({
      schemename: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      maxamount: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      minamount: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      interest: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(100)
      ])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.schemeId = params['id']; // Get 'id' from query parameters
      this.getloanSchemeById(this.schemeId); // Fetch the loan scheme details
    });
  }

  getloanSchemeById(id: any) {
    this.loanSchemeService.getLoanschemeById(id).subscribe(data => {
      this.loanSchemeForm.patchValue(data);
    });
  }

  onCancel() {
    // Navigate back to the View Loan Scheme page
    this.router.navigateByUrl('admin/viewloanscheme');
    this.toastr.info('Update cancelled.', 'Info', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }

  onSubmit() {
    if (this.loanSchemeForm.valid) {
      this.loanSchemeService.updateLoanScheme(this.schemeId, this.loanSchemeForm.value).subscribe({
        next: (data) => {
          this.toastr.success('Loan Scheme updated successfully', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl('admin/viewloanscheme');
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

  get f() {
    return this.loanSchemeForm.controls;
  }
}
