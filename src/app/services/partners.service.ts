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
private approveUrl = '/api/administrator/approveUser'; 
private suspendUrl = '/api/administrator/suspendUser';
  private partnerDetailsUrl = '/api/administrator/getPartnerExtraDetails'; // 
  constructor(private http: HttpClient) {}

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.baseUrl,{});
  }

  getPartnerDetails(partnerId: string): Observable<PartnerDetails> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.get<PartnerDetails>(this.partnerDetailsUrl, { params });
  }
  

  suspendPartner(userId: string, isSuspended: boolean): Observable<string> {
    return this.http.post<string>(
      this.suspendUrl,
      {},
      {
        params: {
          userId: userId,
          isSuspended: isSuspended.toString()
        }
      }
    );
  }

  approvePartner(userId: string, isApproved: boolean): Observable<string> {
    return this.http.post<string>(
      this.approveUrl,
      {},
      {
        params: {
          userId: userId,
          isApproved: isApproved.toString(),
        }
      }
    );
  }
}