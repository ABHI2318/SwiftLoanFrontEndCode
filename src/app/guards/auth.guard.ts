import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = payload.exp * 1000 < Date.now();
        const userRole = payload['role'];

        // Get allowed roles from route data
        const allowedRoles: string[] = route.data['roles'];
        // Check if the user's role matches allowed roles and token is not expired
        if (!isTokenExpired && allowedRoles.includes(userRole[0].authority)) {
          return true; // Token is valid
        }
        else {
          alert("You don't have permission to access this page.");
          // Redirect to home if not allowed
          setTimeout(() => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/');
          }, 2);
          return false; // Token is invalid or expired
        }
      } catch (e) {
        console.error('Invalid token:', e);
        return false;
      }
    }
    else {
      alert("You are logged out! Please log in again.");
      // Redirect to login if not authenticated
    
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
      
      return false;
    }
  }
}