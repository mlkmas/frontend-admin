import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private baseUrl = '/api/administrator/getAllPartners'; // Proxy will handle the base URL

  constructor(private http: HttpClient) {}

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.baseUrl,{});
  }
}