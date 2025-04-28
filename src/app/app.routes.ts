

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; 
import { PartnerComponent } from './components/partner/partner.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
 export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeDashboardComponent },
      //{ path: '', redirectTo: 'home', pathMatch: 'full' },
     // { path: 'home', component: HomeComponent },
      { path: 'partner', component: PartnerComponent },
      { path: 'customer', component: CustomerComponent },
      // TO DO: { path: 'reservation', component: ReservationComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];


// import { Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { LoginComponent } from './components/login/login.component';
// import { HomeComponent } from './components/home/home.component'; 
// import { PartnerComponent } from './components/partner/partner.component';
// import { CustomerComponent } from './components/customer/customer.component';
// import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'home',
//     component: HomeComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {path: '', component: HomeDashboardComponent },
//       { path: 'partner', component: PartnerComponent },
//       { path: 'customer', component: CustomerComponent },
//     ]
//   },
//   { path: '**', redirectTo: 'login' }
// ];






