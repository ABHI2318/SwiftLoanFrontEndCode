import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpaServiceService {

   getallnpaurl ="http://localhost:8080/loanapp/npa-users";
   getallMissedpayemes="http://localhost:8080/loanapp/missed-payments";
  constructor(private http:HttpClient) { }
  getAllNpaUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', (page).toString())  // Adjust if the API expects 0-based indexing
      .set('pageSize', pageSize.toString());
  
    return this.http.get<any>(this.getallnpaurl, { params });
  }
  
  // Get missed payments for a specific user
  getMissedPaymentsByUser(userId: number, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', (page).toString())  // Adjust if the API expects 0-based indexing
      .set('pageSize', pageSize.toString());
  
    return this.http.get<any>(`${this.getallMissedpayemes}/${userId}`, { params });
  }
}
