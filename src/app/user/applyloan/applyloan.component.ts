import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent implements OnInit {
  @Output() loanSubmitted = new EventEmitter<void>(); // Emit event on submission

  uploadForm: FormGroup;
  file1: File | null = null;
  file2: File | null = null;
  file3: File | null = null;
  loanSchemeId: any;

  constructor(
    private fb: FormBuilder, 
    private loanService: ApplyloansService,
    private route: ActivatedRoute, // Inject ActivatedRoute to access query parameters
    private toastr: ToastrService
  ) {
    this.uploadForm = this.fb.group({
      loanAmount: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the query parameter schemeId from the URL
    this.route.queryParams.subscribe(params => {
      this.loanSchemeId = params['schemeId'];
      if (!this.loanSchemeId) {
        console.error('Loan scheme ID is missing.');
        // this.toastr.error('Loan scheme ID is missing.', 'Error', {
        //   timeOut: 5000,
        //   progressBar: true,
        //   closeButton: true,
        //   positionClass: 'toast-top-right',
        // });
      }
    });
  }

  onFileSelect(event: Event, type: string): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
  
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.warning('Only PDF and JPEG files are allowed.', 'Warning', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.warning('File size exceeds the maximum limit of 5 MB.', 'Warning', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        return;
      }
  
      if (type === 'adhar') this.file1 = file;
      if (type === 'pan') this.file2 = file;
      if (type === 'bank') this.file3 = file;
    }
  }
  
  onSubmit(): void {
    if (this.file1 && this.file2 && this.file3 && this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('loanamount', this.uploadForm.value.loanAmount);
      formData.append('time', this.uploadForm.value.time);
      formData.append('loanscheme_id', this.loanSchemeId.toString());
      formData.append('adharFile', this.file1);
      formData.append('panFile', this.file2);
      formData.append('bankFile', this.file3);
  
      this.loanService.uploadFile(formData, this.loanSchemeId).subscribe({
        next: (response) => {
          console.log('Loan application successful:', response);
          this.toastr.success('Loan application submitted successfully.', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: (err) => {
          console.error('Error submitting loan application:', err);
  
          // Display the specific message if returned by the backend
          if (err.error && err.error.message) {
            this.toastr.error(err.error.message, 'Error', {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right',
            });
          } else {
            this.toastr.error('Failed to submit the application. Please try again.', 'Error', {
              timeOut: 5000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right',
            });
          }
        },
      });
    } else {
      this.toastr.warning('Please fill all the fields and upload all files.', 'Warning', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    }
  }
}
