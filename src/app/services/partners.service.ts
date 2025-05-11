import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Partner } from '../models/partner.model';
import { PartnerDetails } from '../models/partner-details.model';
import { SystemStatistics } from '../models/statistics.model';
import { map } from 'rxjs/operators';

import { Package, Question, Product, PackageModel } from '../models/package.model'; 
@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private basePartnersUrl = '/api/administrator/getAllPartners'; 
private approveUrl = '/api/administrator/approveUser'; 
private suspendUrl = '/api/administrator/suspendUser';
  private partnerDetailsUrl = '/api/administrator/getPartnerExtraDetails'; 
  private statisticUrl = '/api/administrator/statistics/systemStatistics';
  private packagesUrl = '/api/administrator/getPartnerPackages';
  private addPackageUrl = '/api/administrator/addPartnerPackage';
  private updateQuestionsUrl = '/api/administrator/package/questions/update';

  private removePackageUrl = '/api/administrator/removePartnerPackage';
 private pkgServicesUrl = '/api/administrator/store/services/get'
 private baseUrl = '/api/administrator';
  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    // Return the actual error message from the server if available
    return throwError(() => new Error(error.error?.message || 'Something went wrong; please try again later.'));
  }
  getAllPartners(): Observable<Partner[]> {
    return this.http.post<Partner[]>(this.basePartnersUrl,{});
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
  getAvailableServices(regionDTOs: any[]): Observable<{ services: Product[], products: Product[] }> {
    return this.http.post<{ services: Product[], products: Product[] }>(
      this.pkgServicesUrl, 
      regionDTOs
    ).pipe(catchError(this.handleError));
  }
  

  updatePackageQuestions(partnerId: string, packageId: string, questions: Question[]): Observable<any> {
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);

      return this.http.post(this.updateQuestionsUrl, questions, { params }).pipe(catchError(this.handleError));

  }

  removePackage(partnerId: string, packageId: string): Observable<any> {
    const params = new HttpParams()
      .set('partnerId', partnerId)
      .set('packageId', packageId);
  
    // Send an empty object as the body since the API expects a POST with query params
    return this.http.post(this.removePackageUrl, {}, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error removing package:', error);
          return throwError(() => new Error(error.error?.message || 'Failed to remove package'));
        })
      );
  }

// Keep only the service method for adding a package
addPartnerPackage(partnerId: string, pkg: any): Observable<any> {
  const params = new HttpParams().set('partnerId', partnerId);
  return this.http.post(this.addPackageUrl, pkg, { params });
}

}