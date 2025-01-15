import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';

@Component({
  selector: 'app-view-loan-scheme',
  templateUrl: './view-loan-scheme.component.html',
  styleUrls: ['./view-loan-scheme.component.css']
})
export class ViewLoanSchemeComponent {
  loanSchemes: any[] = []; // List of loan schemes
  totalElements: number = 0; // Total elements for pagination
  totalPages: number = 1; // Total pages available
  pageSizeOptions: number[] = [5, 10, 15, 20]; // Page size options
  pageSize: number = 10; // Items per page
  currentPage: number = 1; // Current page number
  lastPage: boolean = false; // Indicator for the last page
  searchTerm: string = ''; // Search term for filtering loan schemes

  constructor(
    private loanschemeService: LoanschemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoanSchemes(this.currentPage); // Load loan schemes on initialization
  }

  // Fetch loan schemes for the specified page
  loadLoanSchemes(page: number): void {
    this.loanschemeService.getAdminLoanSchemes(page, this.pageSize).subscribe(
      response => {
        this.loanSchemes = response.contents || [];
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
        this.lastPage = response.lastPage || false;
      },
      error => {
        console.error('Error fetching loan schemes:', error);
        alert('Failed to fetch loan schemes. Please try again later.');
      }
    );
  }

  // Navigate to a specific page
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoanSchemes(this.currentPage);
    }
  }

  // Update the page size and reload schemes
  updatePageSize(): void {
    this.currentPage = 1; // Reset to the first page
    this.loadLoanSchemes(this.currentPage); // Reload the loan schemes with new page size
  }

  // Edit loan scheme
  editLoanScheme(id: number): void {
    this.router.navigate(['/admin/updateloanscheme'], { queryParams: { id: id } });
  }

  // Toggle the deletion (soft delete or undelete) of a loan scheme
  toggleDeleteLoanScheme(id: any): void {
    const scheme = this.loanSchemes.find(scheme => scheme.schemeId === id);
    if (!scheme) return;

    const isCurrentlyDeleted = scheme.isdelete;
    const actionMessage = isCurrentlyDeleted ? 'activate' : 'deactivate';
    const confirmationMessage = `Are you sure you want to ${actionMessage} this loan scheme?`;

    if (confirm(confirmationMessage)) {
      this.loanschemeService.deleteLoanScheme(id).subscribe(
        () => {
          // Reload the loan schemes after toggling the deletion state
          this.loadLoanSchemes(this.currentPage);

          const successMessage = isCurrentlyDeleted
            ? 'Loan scheme successfully activated.'
            : 'Loan scheme successfully deactivated.';
          alert(successMessage);
        },
        error => {
          console.error('Error toggling loan scheme:', error);
          alert('Failed to update loan scheme. Please try again.');
        }
      );
    }
  }

  // Search through the loan schemes
  get filteredLoanSchemes(): any[] {
    if (!this.searchTerm.trim()) return this.loanSchemes;

    const searchText = this.searchTerm.toLowerCase();
    return this.loanSchemes.filter(scheme =>
      Object.values(scheme).some(value =>
        value != null && value.toString().toLowerCase().includes(searchText)
      )
    );
  }
}

