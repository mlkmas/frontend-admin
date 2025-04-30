import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnerDetails } from '../models/partner-details.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private baseUrl = '/api/administrator/getAllPartners'; // Proxy will handle the base URL

  constructor(private http: HttpClient) {}

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.baseUrl,{});
  }

  getPartnerDetails(id: string): Observable<PartnerDetails> {
    const url = `https://wosh-dev.herokuapp.com/api/authorization/administrator/getPartnerDetails?partnerId=${id}`;
    return this.http.get<PartnerDetails>(url);
  }
  
}