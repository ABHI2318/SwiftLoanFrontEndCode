import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payemi/payemi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  elements: any;
  card: any;
  amount: number = 0;
  emiId: any = "";
  isPaid: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    // Get the query parameter `schemeId` from the URL
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'];
      this.emiId = params['emiId'];
      if (!this.amount) {
        console.error('Loan scheme ID is missing.');
        this.toastr.error('Loan scheme ID is missing.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });

    this.stripe = await loadStripe('pk_test_51QclP3P2dfRpkybIgEJQUBhpAxSHac20ICZTOkSISGRtsUeGf9Nbx5Tn0ijyZJLEnPWpHP66V7NDDUkmJt57tMej00MedgNSdo');
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment() {
    const stripe_secret_key = "sk_test_51QclP3P2dfRpkybIDbWEKP4p6sBupQXvwPI8GZAhOtdPNfEqmXgtBQGzHkd2cYN1gBOcxluzNY2CXhhFQa76w2xK004NhU0hF2";
    this.isPaid = true;
    if (this.amount <= 0) {
      

      this.toastr.warning('Please enter a valid amount.', 'Warning', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
      return;
    }

    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    const response = await fetch('http://localhost:8080/api/payment/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: this.amount }),
    });

    this.paymentService.makePayment(this.emiId).subscribe({
      next: () => {
        this.toastr.success('Payment successful!', 'Success', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl('userdashboard/viewapprovedloans');
      },
      error: () => {
        this.toastr.error('Payment failed. Please try again.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    });

    const chargeId = await response.text();
    console.log(chargeId);

    if (!chargeId || !chargeId.startsWith('ch_')) {
      console.error('Invalid chargeId:', chargeId);
      this.toastr.error('Invalid charge ID received.', 'Error', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
      return;
    }

    const result = await this.stripe.confirmCardPayment(stripe_secret_key, {
      payment_method: {
        card: this.card,
      },
    });

    if (result.error) {
      console.log("Error: " + result.error.message);
      this.toastr.error(result.error.message, 'Error', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
      });
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        this.toastr.success('Payment successful!', 'Success', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
        this.router.navigateByUrl('/viewEmi');
      }
    }
  }
}
