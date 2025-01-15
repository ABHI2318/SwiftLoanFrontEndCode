import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

 constructor(private http:HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 private loanstatusurl = ' http://localhost:8080/loanapp/users';
 private getLoanDetailsUrl = "http://localhost:8080/loanapp/details";
 private getallLoanRequestUrl = "http://localhost:8080/loanapp"
 getallusers(page: number, pageSize: number) {
  const params = new HttpParams()
    .set('pageNumber', (page-1).toString())  // Assuming page starts from 1 (if it's 0-based, subtract 1)
    .set('pageSize', pageSize.toString());

  return this.http.get<any>(this.loanstatusurl, { params });
}

getLoanRequests(page: number, size: number): Observable<any> {
  const params = new HttpParams()
    .set('pageNumber', page.toString())
    .set('pageSize', size.toString()); // Using HttpParams to pass query parameters

  return this.http.get<any>(this.getLoanDetailsUrl, { params }); // Pass params as part of the request
}


getalLoanRequests(page: number, size: number): Observable<any> {
  return this.http.get(`${this.getallLoanRequestUrl}/getloanrequests?pageSize=${size}&pageNumber=${page}`);
}

getRejectionRemark(loanId: number): Observable<any> {
  return this.http.get(`${this.getallLoanRequestUrl}/getremark/${loanId}`);
}
}
