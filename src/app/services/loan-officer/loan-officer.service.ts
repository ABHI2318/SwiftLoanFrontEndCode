import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanOfficerService {

  constructor(private http:HttpClient) { }
  private LoanOfficerUrl = "http://localhost:8080/loanapp/loanofficer";

  private deleteLoanOfficerUrl ="http://localhost:8080/loanapp/deletelaonofficer";

  private fetchLoanOfficerUrl ="http://localhost:8080/loanapp/fetchloanofficer";

  private UpadateLoanOfficerUrl = "http://localhost:8080/loanapp/updateloanofficer";

  getAllLoanOfficer(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())        // Changed from 'pageNumber' to 'page'
      .set('pageSize', pageSize.toString()); // Keep 'pageSize' as is
    
    return this.http.get<any>(`${this.LoanOfficerUrl}`, { params });
  }

  deleteLoanOfficer(id: string): Observable<any> {

    return this.http.delete<any>(`${this.deleteLoanOfficerUrl}/${id}`);
  }

  AddLoanOfficers(value:any){
    return this.http.post<any>(this.LoanOfficerUrl, value);
  }
  
  fetchloanOfficer(){
    return this.http.get<any>(`${this.fetchLoanOfficerUrl}`);
  }

  updateLoanOfficer(value:any){
    console.log(value);
    return this.http.post<any>(this.UpadateLoanOfficerUrl, value);
  }

  //loanofficer
  private GetAllLoanRequestUrl = 'http://localhost:8080/loanapp';

 

  getLoanRequests(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.GetAllLoanRequestUrl}/viewloanrequest?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  

  approveLoan(loanId: number): Observable<any> {
    return this.http.post(`${this.GetAllLoanRequestUrl}/approveloan?loanid=${loanId}`, {});
  }

  rejectLoan(loanId: number, remark: any): Observable<any> {
   console.log(`${remark} in service`);
    return this.http.post(`${this.GetAllLoanRequestUrl}/rejectloan?loanid=${loanId}`, remark, {
      headers: { 'Content-Type': 'application/json' }, // Explicitly set JSON content type
    });
  }



  private fetchUserUrl ="http://localhost:8080/loanapp/fetchuser";

  private UpdateUserUrl = "http://localhost:8080/loanapp/updateuser";
  updateUser(value:any){
    console.log(value);
    return this.http.post<any>(this.UpdateUserUrl, value);
  }
  fetchUser(){
    return this.http.get<any>(`${this.fetchUserUrl}`);
  }

}