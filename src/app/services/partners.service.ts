import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnerDetails } from '../models/partner-details.model';
import { SystemStatistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private baseUrl = '/api/administrator/getAllPartners'; 
private approveUrl = '/api/administrator/approveUser'; 
private suspendUrl = '/api/administrator/suspendUser';
  private partnerDetailsUrl = '/api/administrator/getPartnerExtraDetails'; 
  private statisticUrl = '/api/administrator/statistics/systemStatistics';
  
  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.baseUrl,{});
  }

  getPartnerDetails(partnerId: string): Observable<PartnerDetails> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.get<PartnerDetails>(this.partnerDetailsUrl, { params });
  }
  

  getPartnerExtraDetails(partnerId: string): Observable<PartnerDetails> {
    return this.http.get<PartnerDetails>(
      this.partnerDetailsUrl,
      {
        params: { partnerId }
      }
    ).pipe(
      catchError(this.handleError)
    );
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

  getSystemStatistics(): Observable<SystemStatistics> {
    return this.http.post<SystemStatistics>(this.statisticUrl, {});
  }
}