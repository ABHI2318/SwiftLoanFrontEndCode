import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  // Bound to the calculator inputs
  loanAmount: number = 0;
  annualInterestRate: number = 0; // e.g., 10 for 10% per year
  loanDuration: number = 0;       // in months

  // Bound to the result fields
  monthlyEMI: number = 0;
  principal: number = 0;
  totalPayable: number = 0;

  calculateEMI(): void {
    if (this.loanAmount <= 0 || this.annualInterestRate <= 0 || this.loanDuration <= 0) {
      alert('Please enter valid values for Loan Amount, Interest Rate, and Duration.');
      return;
    }

    this.principal = this.loanAmount;

    // Convert annual interest rate (e.g. 10) to monthly decimal (0.10 / 12)
    const monthlyInterestRate = (this.annualInterestRate / 100) / 12;
    const numberOfMonths = this.loanDuration;

    // EMI Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    // P = loanAmount, r = monthlyInterestRate, n = numberOfMonths
    const numerator = this.loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfMonths);
    const denominator = Math.pow((1 + monthlyInterestRate), numberOfMonths) - 1;

    this.monthlyEMI = denominator === 0 ? 0 : (numerator / denominator);

    // Total payable is EMI * number of months
    this.totalPayable = this.monthlyEMI * numberOfMonths;
  }
}
