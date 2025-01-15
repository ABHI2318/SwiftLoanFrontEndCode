import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/services/loan-request/loan-request.service';

@Component({
  selector: 'app-view-loan-request',
  templateUrl: './view-loan-request.component.html',
  styleUrls: ['./view-loan-request.component.css']
})
export class ViewLoanRequestComponent implements OnInit {
  
  loanRequests = []; // Holds the list of loan requests
  pageResponse = {
    totalElements: 0, // Total number of elements
    totalPages: 0,    // Total number of pages
    pageSize: 5,     // Number of elements per page
    contents: [],     // Current page contents
    lastPage: false   // Is this the last page
  };
  currentPage = 0; // Current page index
  pageSize = 5; // Number of records per page
  filterText = ''; // Search text for filtering

  constructor(private loanRequestService: LoanRequestService) {}

  ngOnInit(): void {
    this.getLoanRequests(); // Fetch loan requests on component load
  }

  // Fetch loan requests with pagination
  getLoanRequests(page: number = 0): void {
    this.loanRequestService.getLoanRequests(page, this.pageSize).subscribe((response: any) => {
      // Update page response and loan requests
      this.pageResponse = response;
      this.loanRequests = response.contents;
    });
  }

  // Handle pagination: Go to the next or previous page
  onPageChange(page: number): void {
    if (page >= 0 && page < this.pageResponse.totalPages) {
      this.currentPage = page;
      this.getLoanRequests(page);
    }
  }

  // Triggered on filter input change
  applyFilter(): void {
    // Filtering is handled automatically using the `filter` pipe in the template
  }
}