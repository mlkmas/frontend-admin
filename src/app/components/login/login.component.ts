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
  username = '';
  isLoading = false; 
  errorMessage = ''; 

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.loginService.login(this.username, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = this.getErrorMessage(err);
        alert(this.errorMessage);
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Network error: Please check your connection';
    } else if (error.status === 401) {
      return 'Invalid username or password';
    } else {
      return 'Login failed. Please try again later.';
    }
  }
}

// import { Component } from '@angular/core';
// import { LoginService } from '../../services/login.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })


// export class LoginComponent {
//   password = '';
//   username = '';

//   constructor(private loginService: LoginService, private router: Router) {}

//   onLogin() {
//     this.loginService.login(this.username, this.password,()=>{
// this.router.navigate(['/home']);
//     },
//   ()=>{ alert('Login failed')});
//     }
// }


// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { LoginService } from '../../services/login.service';
// // import { MockService } from '../../mock/mock.service';

// // const USE_MOCK_SERVICE = false; // Set to false to use real backend

// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   password = '';
// //   username = '';

// //   constructor(
// //     private realLoginService: LoginService,
// //     private mockLoginService: MockService,
// //     private router: Router
// //   ) {}

// //   onLogin() {
// //     if (USE_MOCK_SERVICE) {
// //       this.mockLoginService.fakeLogin(this.username, this.password).subscribe({
// //         next: (res) => {
// //           if (res.success) {
// //             console.log('Mock login success!');
// //             this.router.navigate(['/home']);
// //           } else {
// //             alert('Use username: demo, password: demo for mock login');
// //           }
// //         },
// //         error: (err) => {
// //           console.error('Mock login error', err);
// //           alert('Login error occurred');
// //         }
// //       });
// //     } else {
// //       this.realLoginService.login(
// //         this.username,
// //         this.password,
// //         () => this.router.navigate(['/home']),
// //         () => alert('Login failed')
// //       );
// //     }
// //   }
// // }




