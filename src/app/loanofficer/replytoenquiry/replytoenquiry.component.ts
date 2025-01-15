import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryServiceService } from 'src/app/services/Enquiry/enquiry-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-replytoenquiry',
  templateUrl: './replytoenquiry.component.html',
  styleUrls: ['./replytoenquiry.component.css']
})
export class ReplytoenquiryComponent implements OnInit {
  enquiries: any[] = [];
  replyForm: FormGroup;
  selectedEnquiry: number | null = null;

  // Pagination variables
  pageNumber: number = 0;       // Current page (0-indexed)
  pageSize: number = 10;       // Items per page
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];        // Array of pages for display

  // Modal flag
  isReplyModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryServiceService,
    private toastr: ToastrService
  ) {
    this.replyForm = this.fb.group({
      response: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEnquiries(this.pageNumber, this.pageSize);
  }

  // Fetch enquiries from the backend
  fetchEnquiries(pageNumber: number, pageSize: number): void {
    this.enquiryService.getAllEnquiries(pageNumber, pageSize).subscribe({
      next: (response: any) => {
        this.enquiries = response.contents;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        // Build an array of page indexes (0,1,2,...)
        // this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
        // this.toastr.success('Enquiries fetched successfully.', 'Success', {
        //   timeOut: 3000,
        //   progressBar: true,
        //   closeButton: true,
        //   positionClass: 'toast-top-right',
        // });
      },
      error: (err: any) => {
        console.error('Error fetching enquiries:', err);
        this.toastr.error('Failed to fetch enquiries. Please try again.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });
  }

  // Open the reply modal
  openReplyModal(enquiry: any): void {
    this.selectedEnquiry = enquiry.enquiryId;
    this.replyForm.reset();
    this.isReplyModalOpen = true;
  }

  // Close the reply modal
  closeReplyModal(): void {
    this.isReplyModalOpen = false;
  }

  // Submit the reply
  onReplyEnquiry(): void {
    if (this.replyForm.valid && this.selectedEnquiry !== null) {
      const payload = this.replyForm.value; // { response: '...' }
      this.enquiryService.replyToEnquiry(this.selectedEnquiry, payload).subscribe({
        next: () => {
          // Close modal and refresh the enquiries
          this.isReplyModalOpen = false;
          this.fetchEnquiries(this.pageNumber, this.pageSize);
          this.toastr.success('Reply submitted successfully.', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: (err: any) => {
          console.error('Error replying to enquiry:', err);
          this.toastr.error('Failed to submit reply. Please try again.', 'Error', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        }
      });
    } else {
      this.toastr.warning('Please provide a valid response.', 'Warning', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    }
  }

  // Handle page changes
  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.pageNumber = newPage;
      this.fetchEnquiries(this.pageNumber, this.pageSize);
    }
  }

  /**
   * Optional helper to map the status string
   * to a Bootstrap color (success, warning, etc.).
   */
  getStatusColor(status: string): string {
    // Adjust mappings as needed
    switch (status.toUpperCase()) {
      case 'RESOLVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'OPEN':
        return 'info';
      default:
        return 'secondary';
    }
  }
}
