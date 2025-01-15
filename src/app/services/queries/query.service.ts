import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
 
  private baseUrl = 'http://localhost:8080/loanapp/submitQuery'; // URL of your backend
  private getQuery='http://localhost:8080/loanapp/allqueries';
  
  constructor(private http: HttpClient) {}

  // Method to submit the query data without FormData (simpler data submission)
  submitQueryapplication(application: { query: string; querytype: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, application)
      .pipe(
        catchError(error => {
          console.error('Error occurred while submitting application:', error);
          return throwError(error); // Propagate error
        })
      );
  }

  getSubmittedQueries(): Observable<any[]> {
    return this.http.get<any[]>(this.getQuery);
  }
  
  submitQuery(data: FormData): Observable<any> {
  
    
    return this.http.post<any>(this.baseUrl, data)
      .pipe(
        catchError(error => {
          console.error('Error occurred while submitting query:', error);
          return throwError(error); // Propagate error
        })
      );
  }


  private apiUrl = "http://localhost:8080/loanapp";


  getAllQueries(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<any>(`${this.apiUrl}/allqueries`, { params });
  }
}


