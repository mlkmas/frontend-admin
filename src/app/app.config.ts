import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptorInterceptor } from './interceptors/custom-interceptor.interceptor';
//import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([customInterceptorInterceptor/*,loadingInterceptor*/])) ,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
