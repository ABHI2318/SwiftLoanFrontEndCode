import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    captchaInput: new FormControl('', Validators.required),
  });

  captchaText: string = '';
  captchaError: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  // Generate random CAPTCHA
  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captchaText = Array.from({ length: 6 })
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  }

  // Handle login
  logIn(): void {
    const userCaptchaInput = this.loginForm.get('captchaInput')?.value;

    // Check CAPTCHA
    if (userCaptchaInput !== this.captchaText) {
      this.captchaError = true;
      this.generateCaptcha(); // Regenerate CAPTCHA on error
      return;
    }

    // Reset CAPTCHA error
    this.captchaError = false;

    // Proceed with login logic
    this.loginService.signIn(this.loginForm.value).subscribe({
      next: (response) => {
        const myToken = response.accessToken;
        localStorage.setItem('token', myToken);
        const payload = JSON.parse(atob(myToken.split('.')[1]));
        const userRole = payload['role'];

        if (userRole[0].authority === 'ROLE_ADMIN') {
          this.router.navigateByUrl('admin/admindashboard');
        } else if (userRole[0].authority === 'ROLE_LOANOFFICER') {
          this.router.navigateByUrl('loanofficer/loanofficerdashboard');
        } else {
          this.router.navigateByUrl('user/userdashboard');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.toastr.error('Login failed. Please check your credentials and try again.', 'Error', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }
}
