import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, ReservationStatus } from '../../models/reservation.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
interface EnhancedReservation extends Reservation {
  verified: boolean;
  statusClass: string;
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    MatProgressSpinnerModule 
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: EnhancedReservation[] = [];
  selectedReservation: EnhancedReservation | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    this.error = null;
    
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data.map(res => ({
          ...res,
          verified: this.isReservationVerified(res),
          statusClass: this.getStatusClass(res.lastReservationEvents?.reservationStatus)
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load reservations. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  showDetails(reservation: EnhancedReservation): void {
    this.selectedReservation = reservation;
  }

  closeDetails(): void {
    this.selectedReservation = null;
  }

  formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toLocaleString() : 'N/A';
  }

  getStatusClass(status?: ReservationStatus): string {
    if (!status) return '';
    const normalized = status.toLowerCase().replace(/ /g, '_');
    const allowedStatuses = ['initialized', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    return allowedStatuses.includes(normalized) ? normalized : '';
  }

  isReservationVerified(reservation: Reservation): boolean {
    const status = reservation.lastReservationEvents?.reservationStatus;
    return status === 'COMPLETED' || status === 'CONFIRMED';
  }
}