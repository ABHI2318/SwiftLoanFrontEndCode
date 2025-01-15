import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from 'src/app/services/loan-request/loan-request.service';

@Component({
  selector: 'app-viewloanrequest',
  templateUrl: './viewloanrequest.component.html',
  styleUrls: ['./viewloanrequest.component.css']
})
export class ViewloanrequestComponent implements OnInit {
  loans: any[] = [];
  rejectionRemarks: { [key: number]: string } = {};
  currentPage = 1;
  totalPages = 1;
  pageSize = 3;
  totalElements = 0;

  constructor(private loanService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getalLoanRequests(this.currentPage - 1, this.pageSize).subscribe(
      (response) => {
        this.loans = response.contents;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  fetchRemarks(loanId: number): void {
    this.loanService.getRejectionRemark(loanId).subscribe(
      (response) => {
        this.rejectionRemarks[loanId] = response.message;
      },
      (error) => {
        console.error('Error fetching remarks:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLoans();
    }
  }

  get paginationArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  /**
   * Helper to map the status to a Bootstrap color:
   * 'REJECTED' -> 'danger', 'APPROVED' -> 'success', else 'secondary'
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
