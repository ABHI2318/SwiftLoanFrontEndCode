/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllappliedloanService } from 'src/app/services/applyloan/allappliedloan.service';

@Component({
  selector: 'app-allappliedloan',
  templateUrl: './allappliedloan.component.html',
  styleUrls: ['./allappliedloan.component.css']
})
export class AllappliedloanComponent implements OnInit {
  loans: any[] = [];
  totalElements: number = 0; // Total elements for pagination
  totalPages: number = 1;   // Total pages available
  pageSize: number = 3;    // Items per page
  currentPage: number = 1;  // Current page number
searchTerm: string = '';

get filteredLoans() {
  return this.loans.filter(loan =>
    ((loan.user_id ? String(loan.user_id).toLowerCase() : '').includes(this.searchTerm.toLowerCase()) || 
     (loan.loanstatus ? String(loan.loanstatus).toLowerCase() : '').includes(this.searchTerm.toLowerCase()))
  );
}

  constructor(private loanService: AllappliedloanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans(this.currentPage);
  }

  loadLoans(page: number = this.currentPage): void {
    this.loanService.getLoans(page, this.pageSize).subscribe({
      next: (response) => {
        this.loans = response.contents;
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
      },
      error: (err) => {
        console.error('Failed to fetch loans', err);
      }
    });
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoans(this.currentPage);
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoans(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoans(this.currentPage);
    }
  }
} */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllappliedloanService } from 'src/app/services/applyloan/allappliedloan.service';

@Component({
  selector: 'app-allappliedloan',
  templateUrl: './allappliedloan.component.html',
  styleUrls: ['./allappliedloan.component.css']
})
export class AllappliedloanComponent implements OnInit {
  loans: any[] = [];
  filteredLoans: any[] = []; // Filtered loans for display
  totalElements: number = 0; // Total elements for pagination
  totalPages: number = 1;
  currentPage: number = 1; // Current page number
  lastPage: boolean = false;
  currentRemark: string = ''; // Current remark for modal
  pageSize: number = 5; // Items per page
  selectedLoanId: number | null = null;

  searchTerm: string = '';
  selectedFilter: string = ''; // Selected filter for loan status

  constructor(private loanService: AllappliedloanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans(this.currentPage);
  }

  loadLoans(page: number): void {
    this.loanService.getLoans(page - 1, this.pageSize).subscribe({
      next: (response) => {
        this.loans = response.contents;
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 1;
        this.lastPage = response.lastPage || false;
        this.filterLoansByStatus(); // Filter loans based on selected status
      },
      error: (err) => {
        console.error('Failed to fetch loans', err);
      }
    });
  }

  filterLoansByStatus(): void {
    if (this.selectedFilter) {
      this.filteredLoans = this.loans.filter(
        (loan) => loan.loanstatus === this.selectedFilter
      );
    } else {
      this.filteredLoans = [...this.loans]; // Show all loans if no filter is selected
    }
  }

  viewRemarks(loanId: any): void {
    this.loanService.getRejectionRemark(loanId).subscribe(
      (response) => {
        this.currentRemark = response.message; // Set the remark for display
        this.selectedLoanId = loanId; // Set the selected loan ID
      },
      (error) => {
        console.error('Error fetching rejection remark:', error);
        this.currentRemark = 'Unable to fetch remarks. Please try again later.'; // Fallback message
      }
    );
  }

  // Pagination controls
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoans(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLoans(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLoans(this.currentPage);
    }
  }
}
