import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calc/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit{

  loanSchemes: any[] = [];  // Array to store loan schemes fetched from backend
  selectedLoanScheme: any = null;  // Holds the selected loan scheme object
  loanAmt: number = 0;
  interestRate: number = 0;
  loanDuration: number = 0;
  emi: number = 0;

  constructor(private loanService: CalculatorService) {}

  ngOnInit() {
    this.fetchLoanSchemes();
  }

  fetchLoanSchemes() {
    this.loanService.getLoanSchemes().subscribe(
      (data: any[]) => {
        console.log('Fetched loan schemes:', data);
        this.loanSchemes = data;
      },
      (error) => {
        console.error('Failed to fetch loan schemes:', error);
      }
    );
  }

  // Update interest rate when user selects a loan scheme
  onLoanSchemeChange() {
    if (this.selectedLoanScheme) {
      this.interestRate = this.selectedLoanScheme.interest; // Set interest rate from selected scheme
    }
  }

  // Calculate EMI based on loan amount, interest rate, and loan duration
  calculateLoan() {
    const monthlyRate = this.interestRate / (12 * 100); // Monthly interest rate
    const numberOfMonths = this.loanDuration * 12; // Total months
    this.emi =
      (this.loanAmt * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  }
}
