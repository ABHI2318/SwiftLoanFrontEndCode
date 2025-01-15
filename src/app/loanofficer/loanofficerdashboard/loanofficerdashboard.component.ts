import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loanofficerdashboard',
  templateUrl: './loanofficerdashboard.component.html',
  styleUrls: ['./loanofficerdashboard.component.css']
})
export class LoanofficerdashboardComponent {
  constructor(private router: Router) { }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['']); 
  }

}
