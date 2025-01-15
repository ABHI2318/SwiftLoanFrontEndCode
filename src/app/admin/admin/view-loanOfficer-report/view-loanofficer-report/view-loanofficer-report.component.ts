import { Component, OnInit } from '@angular/core';
import { LoanschemeService } from 'src/app/services/loanscheme/loanscheme.service';

@Component({
  selector: 'app-view-loanofficer-report',
  templateUrl: './view-loanofficer-report.component.html',
  styleUrls: ['./view-loanofficer-report.component.css']
})
export class ViewLoanofficerReportComponent implements OnInit {
  loanOfficers: any[] = [];
  selectedLoans: any[] = [];
  page: number = 0;
  totalPages: number = 0;
  totalApproved: number = 0;
  totalRejected: number = 0;
  totalPending: number = 0;
  status: string = '';

  isModalOpen: boolean = false;  // Modal visibility control

  constructor(private loanOfficerService: LoanschemeService) {}

  ngOnInit(): void {
    this.loadLoanOfficers();
  }

  loadLoanOfficers(): void {
    this.loanOfficerService.getLoanStatusReport(this.page, 10).subscribe((response: any) => {
      this.loanOfficers = response.contents;
      this.totalPages = response.totalPages;
      
      // Calculate totals dynamically
      this.totalApproved = this.loanOfficers.reduce((acc, officer) => acc + officer.approvedCount, 0);
      this.totalRejected = this.loanOfficers.reduce((acc, officer) => acc + officer.rejectedCount, 0);
      this.totalPending = this.loanOfficers.reduce((acc, officer) => acc + officer.pendingCount, 0);
    });
  }

  filterByStatus(status: string): void {
    this.status = status;
    this.selectedLoans = [];
  }

  viewLoans(officer: any, status: string): void {
    this.status = status;
    this.selectedLoans = []; // Clear previous selection
    
   
    switch (status) {
      case 'approved':
        this.selectedLoans = officer.approvedLoans;
        break;
      case 'rejected':
        this.selectedLoans = officer.rejectedLoans;
        break;
      case 'pending':
        this.selectedLoans = officer.pendingLoans;
        break;
    }

   
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadLoanOfficers();
    }
  }
}