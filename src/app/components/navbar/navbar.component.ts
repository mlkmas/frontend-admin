import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MockService } from '../../mock/mock.service';
import { USE_MOCK_SERVICE } from '../../constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private loginService: LoginService,
    private mockService: MockService,
    private router: Router
  ) {}

  logout() {
    if (USE_MOCK_SERVICE) {
      this.mockService.logout();
    } else {
      this.loginService.logout();
    }
    this.router.navigate(['/login']);
  }
}