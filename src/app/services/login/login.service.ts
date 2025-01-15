import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8080/loanapp/login";
  register_url = "http://localhost:8080/loanapp/register";
  constructor(private http: HttpClient , private router:Router) { }

  signIn(signInData: any):Observable<any> { 
    return this.http.post(this.url, signInData); 
  }

  register(registerData: any): Observable<any> { 
    return this.http.post(this.register_url, registerData); 
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}