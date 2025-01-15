import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loanofficer-header',
  templateUrl: './loanofficer-header.component.html',
  styleUrls: ['./loanofficer-header.component.css']
})
export class LoanofficerHeaderComponent {

  constructor(private router: Router) { }
    logOut() {
      localStorage.removeItem('token');
      this.router.navigate(['']); 
    }
  

}
