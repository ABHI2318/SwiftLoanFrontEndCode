import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NpaServiceService } from 'src/app/services/npa/npa-service.service';
@Component({
  selector: 'app-view-npa',
  templateUrl: './view-npa.component.html',
  styleUrls: ['./view-npa.component.css']
})
export class ViewNpaComponent {
  npaUsers: any[] = [];
  missedPayments: any[] = [];
  pageNumber = 0;
  pageSize = 10;
  totalPages = 0;  // To track total pages
  showModal = false;
  selectedUserId: any = null;

  constructor(private npaService: NpaServiceService) {}

  ngOnInit(): void {
    this.loadPage(this.pageNumber);
  }

  loadPage(page: number): void {
    this.npaService.getAllNpaUsers(page, this.pageSize).subscribe(response => {
      this.npaUsers = response.contents;
      this.pageNumber = page;
      this.totalPages = response.totalPages;  // Get the total pages from the response
    });
  }

  viewMissedPayments(userId: number): void {
    this.selectedUserId = userId;
    this.npaService.getMissedPaymentsByUser(userId, this.pageNumber, this.pageSize).subscribe(response => {
      this.missedPayments = response.contents;
      this.showModal = true;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  // Method to check if next page button should be disabled
  isNextDisabled(): boolean {
    return this.pageNumber >= this.totalPages - 1;
  }

  // Method to check if previous page button should be disabled
  isPrevDisabled(): boolean {
    return this.pageNumber <= 0;
  }
}