// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { LoginService } from './services/login.service';
// import { MockService } from './mock/mock.service';
// import { USE_MOCK_SERVICE } from './constants';
// export const AuthGuard: CanActivateFn = (route, state) => {
//   const loginService = inject(LoginService);
//   const mockService = inject(MockService);
//   const router = inject(Router);
  

//   if (USE_MOCK_SERVICE) {
//     if (!mockService.isLoggedIn()) {
//       router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }

//   if (!loginService.isLoggedIn()) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };



import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
