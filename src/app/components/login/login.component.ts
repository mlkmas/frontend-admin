import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  password = '';
  email = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.email, this.password,()=>{
this.router.navigate(['/home']);
    },
  ()=>{ alert('Login failed')});
    }
}
