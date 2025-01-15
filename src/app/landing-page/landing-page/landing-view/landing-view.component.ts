import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.css']
})
export class LandingViewComponent {

  constructor(private router: Router) {
    
    this.router.navigateByUrl('/welcome-page')
   }
}
