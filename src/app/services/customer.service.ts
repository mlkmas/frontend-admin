// customers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = '/api/administrator/getAllCustomers'; 
  private suspendUserUrl = '/api/administrator/suspendUser';
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.post<Customer[]>(this.baseUrl, {});
  }

  suspendUser(userId: string, isSuspended: boolean): Observable<string> {
    return this.http.post<string>(
      this.suspendUserUrl,
      {},
      {
        params: {
          userId: userId,
          isSuspended: isSuspended.toString()
        }
      }
    );
  }
}