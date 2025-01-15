import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

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
