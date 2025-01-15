import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private loginService :LoginService) { }
signOut() {
  this.loginService.signOut();
}

}
