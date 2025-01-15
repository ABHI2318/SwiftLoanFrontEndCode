/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllappliedloanService {

private apiUrl = 'http://localhost:8080/loanapp/appliedloans'; // Replace with your backend API URL

constructor(private http: HttpClient) {}

getLoans(pageNumber: number, pageSize: number): Observable<any> {
  const token = localStorage.getItem('token'); // Get the token from local storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // Add Authorization header
  });
  
  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());
    
  // Include headers and params in the GET request
  return this.http.get<any>(this.apiUrl, { headers, params });
}
} */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllappliedloanService {

private apiUrl = 'http://localhost:8080/loanapp/appliedloans'; // Replace with your backend API URL

constructor(private http: HttpClient) {}

getLoans(pageNumber: number, pageSize: number): Observable<any> {
  const token = localStorage.getItem('token'); // Get the token from local storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // Add Authorization header
  });
  
  const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString());
    
  // Include headers and params in the GET request
  return this.http.get<any>(this.apiUrl, { headers, params });
}
 private getallLoanRequestUrl = "http://localhost:8080/loanapp"
getRejectionRemark(loanId: number): Observable<any> {
  return this.http.get(`${this.getallLoanRequestUrl}/getremark/${loanId}`);
}
}