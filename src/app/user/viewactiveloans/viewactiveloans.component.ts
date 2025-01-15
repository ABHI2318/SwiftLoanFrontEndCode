import { Component, ViewChild } from '@angular/core';
import { ApprovedloancustomerService } from 'src/app/services/approvedloan/approvedloancustomer-service.service';


@Component({
  selector: 'app-viewactiveloans',
  templateUrl: './viewactiveloans.component.html',
  styleUrls: ['./viewactiveloans.component.css']
})
export class ViewactiveloansComponent {
 // Define the columns to display in the table
 displayedColumns: string[] = [
  'loanid',
  'user_id',
  'scheme_name',
  'loanscheme_id',
  'loanOfficeId',
  'loanamount',
  'time',
  'loanstatus',
  'closed',
  'simpleInterest',
  'monthlyRepayment'
];

// Data source for the table
dataSource: any[] = [];

// Pagination variables
totalElements: number = 0;
pageSize: number = 3;
currentPage: number = 1; // 1-based index for UI
isLoading: boolean = false;
errorMessage: string = '';

constructor(private loanService: ApprovedloancustomerService) { }

ngOnInit(): void {
  this.loadLoanSchemes(this.currentPage);
}

/**
 * Fetches approved loans from the service.
 * @param pageNumber Current page number
 */
loadLoanSchemes(pageNumber: number): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.loanService.getAllApprovedLoans(this.pageSize, pageNumber).subscribe({
    next: (response: any) => {
      this.dataSource = response.contents;
      this.totalElements = response.totalElements;
      this.pageSize = response.pageSize;
      this.currentPage = pageNumber;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error fetching approved loans:', error);
      this.errorMessage = 'An error occurred while fetching approved loans.';
      this.isLoading = false;
    }
  });
}

/**
 * Handles the Previous button click.
 */
previousPage(): void {
  if (this.currentPage > 1) {
    this.loadLoanSchemes(this.currentPage - 1);
  }
}

/**
 * Handles the Next button click.
 */
nextPage(): void {
  if (this.currentPage < this.totalPages()) {
    this.loadLoanSchemes(this.currentPage + 1);
  }
}

/**
 * Changes the number of items per page.
 * @param newPageSize The new page size selected by the user
 */
onPageSizeChange(newPageSize: number): void {
  this.pageSize = Number(newPageSize);
  this.currentPage = 1; // Reset to first page
  this.loadLoanSchemes(this.currentPage);
}

/**
 * Calculates the total number of pages based on total elements and page size.
 * @returns Total number of pages
 */
totalPages(): number {
  return Math.ceil(this.totalElements / this.pageSize);
}
}