import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmiServiceService {
  private baseUrl = 'http://localhost:8080/loanapp/emis';

  constructor(private http: HttpClient) {}

  getEmisByLoanId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }
}