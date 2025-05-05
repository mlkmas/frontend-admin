import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, ReservationStatus } from '../../models/reservation.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // ADD THIS
import { MatPaginatorModule } from '@angular/material/paginator'; // ADD THIS
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


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
    MatProgressSpinnerModule,
    CurrencyPipe,
    ReactiveFormsModule,
    MatPaginatorModule, 
    FormsModule
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: EnhancedReservation[] = [];
  originalReservations: EnhancedReservation[] = [];

  filteredReservations: EnhancedReservation[] = [];
  selectedReservation: EnhancedReservation | null = null;
  isLoading = true;
  error: string | null = null;
  searchControl = new FormControl('');
  currentPage = 0;
  pageSize = 10;
  sortColumn: string = '';

  sortDirection: 'asc' | 'desc' = 'asc';
  inputPage = 1;
  

  constructor(private reservationService: ReservationService) {}

   ngOnInit(): void {
    this.loadReservations();
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(() => this.applyFilters()); }

    loadReservations(): void {
      this.isLoading = true;
      this.error = null;
    
      this.reservationService.getAllReservations().subscribe({
        next: (data) => {
          const enhanced = data.map(res => ({
            ...res,
            verified: this.isReservationVerified(res),
            statusClass: this.getStatusClass(res.lastReservationEvents?.reservationStatus)
          }));
    
          this.reservations = enhanced;
          this.originalReservations = [...enhanced]; // <-- FIXED HERE
    
          this.applyFilters(); 
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

  applyFilters(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    const filtered = this.reservations.filter(res =>
      res.number.toString().toLowerCase().includes(search) ||
      res.customer?.name?.toLowerCase().includes(search) ||
      res.lastReservationEvents?.reservationStatus?.toLowerCase().includes(search)
    );
    this.filteredReservations = this.paginate(filtered);
  }

  paginate(data: EnhancedReservation[]): EnhancedReservation[] {
    const start = this.currentPage * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }

  changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.applyFilters();
  }

  totalPages(): number {
    return Math.ceil(this.reservations.filter(res =>
      res.number.toString().toLowerCase().includes(this.searchControl.value?.toLowerCase() || '') ||
      res.customer?.name?.toLowerCase().includes(this.searchControl.value?.toLowerCase() || '') ||
      res.lastReservationEvents?.reservationStatus?.toLowerCase().includes(this.searchControl.value?.toLowerCase() || '')
    ).length / this.pageSize);
  }
  
  sortBy(field: string): void {
    if (this.sortColumn === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = field;
      this.sortDirection = 'asc';
    }
  
    this.reservations.sort((a, b) => {
      let aValue: any;
      let bValue: any;
  
      if (field === 'customer') {
        aValue = a.customer?.name || '';
        bValue = b.customer?.name || '';
      } else if (field === 'status') {
        aValue = a.lastReservationEvents?.reservationStatus || '';
        bValue = b.lastReservationEvents?.reservationStatus || '';
      } else {
        aValue = (a as any)[field];  // fallback
  bValue = (b as any)[field];
      }
  
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
  
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  
    this.applyFilters(); // reuse your pagination/filter function if any
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) { 
      this.currentPage = page;
      this.applyFilters(); // or update the paginated data
    }
  }
 
  resetFilters(): void {
    this.reservations = [...this.originalReservations];
this.searchControl.setValue('');
this.sortColumn = '';
this.sortDirection = 'asc';
this.currentPage = 0;
this.inputPage = 1;
this.selectedReservation = null;
this.applyFilters();

  }
  
  
  
}