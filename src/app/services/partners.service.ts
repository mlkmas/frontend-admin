import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnerDetails } from '../models/partner-details.model';
import { SystemStatistics } from '../models/statistics.model';
import { map } from 'rxjs/operators';

import { Package, Question, Product, PackageModel } from '../models/package.model'; // This should now work
@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private baseUrl = '/api/administrator/getAllPartners'; 
private approveUrl = '/api/administrator/approveUser'; 
private suspendUrl = '/api/administrator/suspendUser';
  private partnerDetailsUrl = '/api/administrator/getPartnerExtraDetails'; 
  private statisticUrl = '/api/administrator/statistics/systemStatistics';
  private packagesUrl = '/api/administrator/getPartnerPackages';
  private addPackageUrl = '/api/administrator/addPartnerPackage';
  private updateQuestionsUrl = '/api/administrator/Packages/questions/update';
  private removePackageUrl = '/api/administrator/removePackage';
 private pkgServicesUrl = '/api/administrator/store/services/get'

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

  
  getPartnerExtraDetails(partnerId: string): Observable<PartnerDetails> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post<PartnerDetails>(this.partnerDetailsUrl, null, { params })
      .pipe(catchError(this.handleError));
  }
  
  getPartnerPackages(partnerId: string): Observable<PackageModel[]> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post<Package[]>(this.packagesUrl, null, { params }).pipe(
      map(packages => packages.map(pkg => PackageModel.fromJson(pkg)))
    );
  }
  

  addPartnerPackage(partnerId: string, pkg: PackageModel): Observable<any> {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post(this.addPackageUrl, pkg.toJson(), { params });
  }

  updatePackageQuestions(partnerId: string, packageId: string, questions: Question[]): Observable<any> {
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);

    return this.http.post<any>(this.updateQuestionsUrl, questions, { params });
  }
  removePackage(partnerId: string, packageId: string): Observable<any> {
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packagedId', packageId);

    return this.http.post<any>(this.removePackageUrl, {}, { params });
  }

  getAvailableServices(): Observable<{ services: Product[], products: Product[] }> {
    // This endpoint looks like it expects location-based payload.
    const body = [{
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      countryCode: 'string',
      country: 'string',
      city: 'string'
    }];
    return this.http.post<{ services: Product[], products: Product[] }>(this.pkgServicesUrl, body);
  }



}