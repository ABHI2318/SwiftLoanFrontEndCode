import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmiServiceService } from 'src/app/services/emiservice/emi-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewemi',
  templateUrl: './viewemi.component.html',
  styleUrls: ['./viewemi.component.css']
})
export class ViewemiComponent {
  emis: any[] = [];
  loanId: any;

  constructor(
    private emiService: EmiServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loanId = params['loanId'];
      if (!this.loanId) {
        console.error('Loan scheme ID is missing.');
        this.toastr.error('Loan scheme ID is missing.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });

    if (this.loanId) {
      this.emiService.getEmisByLoanId(this.loanId).subscribe({
        next: (response) => {
          this.emis = response;
          console.log(this.emis);
        },
        error: (error) => {
          console.error('Error fetching EMIs', error);
          this.toastr.error('Failed to fetch EMI details. Please try again later.', 'Error', {
            timeOut: 5000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        }
      });
    }

    this.getEmiDetails();
  }

  getEmiDetails(): void {
    this.emiService.getEmisByLoanId(this.loanId).subscribe({
      next: (data) => {
        this.emis = data;

        this.emis.forEach((emi, index) => {
          const emiDate = new Date(emi.date);
          emiDate.setMonth(emiDate.getMonth() + index);
          emi.date = emiDate.toLocaleDateString();
        });
      },
      error: (error) => {
        console.error('Error fetching EMI details:', error);
        this.toastr.error('Failed to fetch EMI details. Please try again later.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });
  }
}
