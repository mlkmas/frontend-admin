import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnerDetails } from '../models/partner-details.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private baseUrl = '/api/administrator/getAllPartners'; // Proxy will handle the base URL

  private partnerDetailsUrl = '/api/administrator/getPartnerExtraDetails'; // 
  constructor(private http: HttpClient) {}

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.baseUrl,{});
  }

  getPartnerDetails(partnerId: string): Observable<PartnerDetails> {
    return this.http.post<PartnerDetails>(
      this.partnerDetailsUrl,
      { partnerId }  // Try with 'id' instead of 'partnerId'
    );
  }
}