import { Component } from '@angular/core';
import { LoanRequestService } from 'src/app/services/loan-request/loan-request.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent {
  customers: any[] = [];
  totalPages: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  searchText: string = '';

  constructor(private customerService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadCustomers(); // Load the initial customers
  }

  // Load customers with pagination and filtering support
  loadCustomers(page: number = this.currentPage): void {
    this.customerService.getallusers(page, this.pageSize).subscribe((response: any) => {
      this.customers = response.contents;
      this.totalPages = response.totalPages;
      this.currentPage = page;
    });
  }

  // Navigate to the next page
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCustomers(this.currentPage); // Reload customers for the next page
    }
  }

  // Navigate to the previous page
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCustomers(this.currentPage); // Reload customers for the previous page
    }
  }
}