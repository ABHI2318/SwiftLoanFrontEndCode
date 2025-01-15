import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
scheme: any;
query: any;
userId: any;

  constructor(private router: Router) { }
logOut() {
  localStorage.removeItem('token');
  this.router.navigate(['']); 
}

isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.querySelector('.navbar')?.classList.toggle('collapsed');
  }

}
