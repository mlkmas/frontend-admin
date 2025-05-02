import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private resrvationUrl = '/api/administrator/getAllReservations';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(this.resrvationUrl,{});
  }

  getReservationById(id: string): Observable<Reservation> {
    const params = new HttpParams().set('reservationId', id);
    return this.http.post<Reservation>(this.resrvationUrl, {}, { params });
  }

  updateReservationStatus(id: string, status: string): Observable<Reservation> {
    const params = new HttpParams().set('reservationId', id).set('status', status);
    return this.http.post<Reservation>(this.resrvationUrl, {}, { params });
  }

 
}