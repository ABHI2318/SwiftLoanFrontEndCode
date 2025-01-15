import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryServiceService {
  private baseUrl = 'http://localhost:8080/loanapp/unresolvedQuery';
  private unresolvedQuery='http://localhost:8080/loanapp/replyenquiry';

  constructor(private http: HttpClient) {}

  getAllEnquiries(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?pageNumber=${page}&pageSize=${size}`);
  }

  replyToEnquiry(enquiryId: number, response: any): Observable<any> {
    console.log(response);
    
    return this.http.post<any>(`${this.unresolvedQuery}/${enquiryId}`,   response );
  }
}
