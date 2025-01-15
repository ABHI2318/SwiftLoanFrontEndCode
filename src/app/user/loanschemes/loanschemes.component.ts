import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyloansService } from 'src/app/services/applyloan/applyloans.service';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';
import { ToastrService } from 'ngx-toastr';

interface LoanScheme {
  schemeId: string;
  schemename: string;
  minamount: number;
  maxamount: number;
  interest: number;
}

@Component({
  selector: 'app-loanschemes',
  templateUrl: './loanschemes.component.html',
  styleUrls: ['./loanschemes.component.css'],
})
export class LoanschemesComponent implements OnInit {
  @Output() loanSubmitted = new EventEmitter<void>();
  uploadForm: FormGroup;
  adharFile: File | null = null;
  panFile: File | null = null;
  bankFile: File | null = null;
  loanSchemeId: any;

  // Loan Schemes Variables
  loanSchemes: LoanScheme[] = [];
  totalElements: number = 0;
  totalPages: number = 1;
  pageSize: number = 3;
  currentPage: number = 1;
  lastPage: boolean = false;
  searchTerm: string = '';

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private loanService: ApplyloansService,
    private route: ActivatedRoute,
    private loanSchemeService: LoanschemeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.uploadForm = this.fb.group({
      loanAmount: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  private toTitleCase(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loanSchemeId = params['schemeId'];
      if (!this.loanSchemeId) {
        // console.error('Loan scheme ID is missing.');
        // this.toastr.error('Loan scheme ID is missing.', 'Error');
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });

    this.loadLoanSchemes(this.currentPage);
  }

  private updateFormValidators(minAmount: number, maxAmount: number): void {
    this.uploadForm.controls['loanAmount'].setValidators([
      Validators.required,
      Validators.min(minAmount),
      Validators.max(maxAmount),
    ]);
    this.uploadForm.controls['time'].setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]);
    this.uploadForm.updateValueAndValidity();
  }

  applyLoanModal(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      centered: true,
    });
  }

  // File selection handlers
  handleFileSelect(
    event: Event,
    fileType: string,
    allowedTypes: string[],
    errorMessage: string
  ): File | null {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return null;

    if (!allowedTypes.includes(file.type)) {
      this.toastr.warning(errorMessage, 'Warning');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.toastr.warning('File size exceeds the maximum limit of 5 MB.', 'Warning');
      return null;
    }

    return file;
  }

  onAdharFileSelect(event: Event): void {
    this.adharFile = this.handleFileSelect(
      event,
      'adhar',
      ['application/pdf', 'image/jpeg', 'image/jpg'],
      'Only PDF and JPEG files are allowed for Aadhaar.'
    );
  }

  onPanFileSelect(event: Event): void {
    this.panFile = this.handleFileSelect(
      event,
      'pan',
      ['application/pdf', 'image/jpeg', 'image/jpg'],
      'Only PDF and JPEG files are allowed for Pan Card.'
    );
  }

  onBankFileSelect(event: Event): void {
    this.bankFile = this.handleFileSelect(
      event,
      'bank',
      ['application/pdf', 'image/jpeg', 'image/jpg'],
      'Only PDF and JPEG files are allowed for Bank Statement.'
    );
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.adharFile && this.panFile && this.bankFile) {
      const formData = new FormData();
      formData.append('adharFile', this.adharFile);
      formData.append('panFile', this.panFile);
      formData.append('bankFile', this.bankFile);
      formData.append('loanamount', this.uploadForm.value.loanAmount);
      formData.append('time', this.uploadForm.value.time);
      formData.append('loanSchemeId', this.loanSchemeId);

      this.loanService.uploadFile(formData, this.loanSchemeId).subscribe({
        next: () => {
          this.toastr.success('Loan application submitted successfully.', 'Success');
          this.loanSubmitted.emit();
        },
        error: () => {
          this.toastr.error('Failed to submit the application. Please try again.', 'Error');
        },
      });
    } else {
      this.toastr.warning('Please fill the form correctly and upload all required files.', 'Warning');
    }
  }

  loadLoanSchemes(page: number): void {
    this.loanSchemeService.getLoanSchemes(page, this.pageSize).subscribe({
      next: (response) => {
        this.loanSchemes = (response.contents || []).map((scheme: LoanScheme) => ({
          ...scheme,
          schemename: this.toTitleCase(scheme.schemename),
        }));
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
        this.lastPage = response.lastPage || false;
      },
      error: () => {
        this.toastr.error('Failed to fetch loan schemes. Please try again later.', 'Error');
      },
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  get filteredLoanSchemes(): LoanScheme[] {
    if (!this.searchTerm.trim()) return this.loanSchemes;

    const searchText = this.searchTerm.toLowerCase();
    return this.loanSchemes.filter((scheme) =>
      Object.values(scheme).some((value) =>
        value != null && value.toString().toLowerCase().includes(searchText)
      )
    );
  }
}
