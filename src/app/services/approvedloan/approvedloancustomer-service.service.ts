import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovedloancustomerService {
  private baseUrl = 'http://localhost:8080/loanapp'; // Base URL of your backend

  constructor(private http: HttpClient) { }

  getAllApprovedLoans(pageSize: number, pageNumber: number): Observable<any> {
    const url =` ${this.baseUrl}/approvedloan`;

    // Adjust pageNumber for 0-based indexing if backend expects it
    const adjustedPageNumber = pageNumber > 0 ? pageNumber - 1 : 0;

    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', adjustedPageNumber.toString());

    return this.http.get<any>(url, { params });
  }
}