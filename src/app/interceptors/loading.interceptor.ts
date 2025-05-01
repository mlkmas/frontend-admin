// // loading.interceptor.ts
// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { LoadingService } from '../shared/services/loading.service';
// import { finalize } from 'rxjs';

// export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
//   const loadingService = inject(LoadingService);
  
//   // Skip loading for specific requests if needed
//   if (req.url.includes('api/authorization/administor/login')) {
//     return next(req);
//   }

//   loadingService.show();
  
//   return next(req).pipe(
//     finalize(() => {
//       loadingService.hide();
//     })
//   );
// };