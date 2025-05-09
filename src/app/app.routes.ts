import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; 
import { PartnerComponent } from './components/partner/partner.component';
import { CustomerComponent } from './components/customer/customer.component';
import{ PartnerDetailsComponent } from './components/partner-details/partner-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ReservationComponent } from './components/reservation/reservation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'partner', component: PartnerComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'partner-details', component: PartnerDetailsComponent },
     { path: 'reservation', component: ReservationComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];




