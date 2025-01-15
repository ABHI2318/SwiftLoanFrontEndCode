import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewapplyloansService {
  private apiUrl = 'http://localhost:8080/loanapp/appliedloans'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getLoans(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getEmis(loanId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/loans/${loanId}/emis`);
  }
}