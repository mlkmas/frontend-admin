// // loading.service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {
//   private isLoadingSubject = new BehaviorSubject<boolean>(false);
//   private activeRequests = 0;

//   isLoading$ = this.isLoadingSubject.asObservable();

//   show() {
//     this.activeRequests++;
//     this.isLoadingSubject.next(true);
//   }

//   hide() {
//     this.activeRequests--;
//     if (this.activeRequests <= 0) {
//       this.activeRequests = 0;
//       this.isLoadingSubject.next(false);
//     }
//   }
// }