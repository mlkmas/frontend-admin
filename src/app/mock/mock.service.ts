import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private isAuthenticated = false;
  private mockToken = 'mock-jwt-token';

  fakeLogin(username: string, password: string): Observable<{ success: boolean }> {
    this.isAuthenticated = username === 'demo' && password === 'demo';
    
    return of({
      success: this.isAuthenticated
    }).pipe(
      delay(500),
      tap(() => {
        if (this.isAuthenticated) {
          localStorage.setItem('JWTTOKEN', this.mockToken);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('JWTTOKEN');
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('JWTTOKEN');
  }
}