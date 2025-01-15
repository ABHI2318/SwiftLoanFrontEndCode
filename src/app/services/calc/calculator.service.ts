import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private apiUrl = 'http://localhost:8080/loanapp/loan-schemes'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getLoanSchemes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
