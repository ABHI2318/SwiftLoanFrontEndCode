// loanscheme.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanschemeService {

  private apiUrl = 'http://localhost:8080/loanapp/loanschemes';  // Your API endpoint

  // Admin URLs
  private addloanSchemeurl = "http://localhost:8080/loanapp/loanschemes";
  private loanSchemeByIdurl = "http://localhost:8080/loanapp/loanschemes";
  private getAllloanSchemesurl = "http://localhost:8080/loanapp/allloanschemes";
  private loanstatusurl = 'http://localhost:8080/loanapp/report';
  private AdminUrl = 'http://localhost:8080/loanapp/loanschemes/search';

  constructor(private http: HttpClient) {}

  getLoanSchemes(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', (pageNumber - 1).toString())  // Assuming API starts page count from 0
      .set('pageSize', pageSize.toString());
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers, params })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Admin Methods with error handling

  addloanScheme(addloanScheme: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Ensure content type is set
    });

    return this.http.post(this.addloanSchemeurl, addloanScheme, { headers })
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  getLoanschemeById(id: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.loanSchemeByIdurl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLoanScheme(id: string, updateloanScheme: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.loanSchemeByIdurl}/${id}`, updateloanScheme, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllloanSchemes(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.getAllloanSchemesurl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getloanSchemeByName(schemeName: string, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('schemeName', schemeName)
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.AdminUrl}`, { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAdminLoanSchemes(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', (page - 1).toString())  // Assuming API starts page count from 0
      .set('pageSize', pageSize.toString());

    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.getAllloanSchemesurl, { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLoanScheme(id: string): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.loanSchemeByIdurl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getLoanStatusReport(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.loanstatusurl, { headers, params })  // We don't need to define models
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side/network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      if (error.error && error.error.message) {
        // Extract error message from backend response
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(() => errorMessage); // Propagate the error message
  }
}
