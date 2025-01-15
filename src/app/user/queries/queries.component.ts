import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryService } from 'src/app/services/queries/query.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
})
export class QueriesComponent implements OnInit {
  uploadForm: FormGroup;
  queries: any[] = [];

  // We keep track of our "fake" page count here (1-based for the UI).
  currentPage: number = 1; 
  totalPages: number = 1;
  pageSize: number = 5;

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private toastr: ToastrService
  ) {
    this.uploadForm = this.fb.group({
      question: ['', [Validators.required]],
      querytype: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // 1) First fetch page 0 to get the totalPages from the backend
    this.queryService.getAllQueries(0, this.pageSize).subscribe({
      next: (response) => {
        // We only use this response to learn how many total pages are available.
        this.totalPages = response.totalPages;

        // 2) Now set our UI page to 1 (meaning "last" backend page) and fetch that page.
        this.currentPage = 1;
        this.fetchQueries();
      },
      error: (err) => {
        console.error('Error fetching initial page 0:', err);
        this.toastr.warning('Failed to fetch queries. Please try again later.', 'Warning', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // Submit a new query
  onSubmit(): void {
    if (this.uploadForm.valid) {
      const queryData = this.uploadForm.value;

      this.queryService.submitQueryapplication(queryData).subscribe({
        next: () => {
          this.uploadForm.reset();  // Reset form
          // After submitting, we want to see the latest queries again 
          // => "UI page 1" => "backend last page"
          this.fetchQueries();
          this.toastr.success('Query submitted successfully!', 'Success', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: (err) => {
          console.error('Error submitting query:', err);
          this.toastr.error('Failed to submit query. Please try again.', 'Error', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
      });
    }
  }

  // Fetch queries from the "appropriate" backend page, 
  // translating our UI's currentPage to the correct backend page index.
  fetchQueries(): void {
    // If our UI's currentPage = 1 => we want the last backend page => index = totalPages - 1
    // If our UI's currentPage = 2 => second to last page => index = totalPages - 2, etc.
    const backendPageIndex = this.totalPages - this.currentPage;

    // Make sure we don't go below 0 or above totalPages - 1
    // (Optional safeguard, in case totalPages changes or user does strange navigation)
    const safeBackendPageIndex = Math.min(Math.max(backendPageIndex, 0), this.totalPages - 1);

    this.queryService.getAllQueries(safeBackendPageIndex, this.pageSize).subscribe({
      next: (response) => {
        // The backend returns the old queries first, so we reverse them 
        // to show the newest query at the top of this page
        this.queries = response.contents.reverse();

        // Update totalPages in case backend has changed since last time
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Error fetching queries:', err);
        this.toastr.warning('Failed to fetch queries. Please try again later.', 'Warning', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  // Pagination: go to the previous UI page (which means we move older in the backend)
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchQueries();
      this.toastr.info('Moved to the previous page.', 'Info', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    }
  }

  // Pagination: go to the next UI page (which means we move to a "newer" backend page)
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchQueries();
      this.toastr.info('Moved to the next page.', 'Info', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    }
  }
}
