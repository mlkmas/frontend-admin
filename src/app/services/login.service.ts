import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const JWT_TOKEN_ENTRY = "JWTTOKEN";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;
  private loginUrl = 'https://wosh-dev.herokuapp.com/api/authorization/administrator/login';
  public token: string = "";

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  private loadToken(): void {
    const savedToken = localStorage.getItem(JWT_TOKEN_ENTRY);
    console.log('Saved token on load:', savedToken);
    if (savedToken) {
      this.token = savedToken;
      this.isAuthenticated = true;
      console.log('User marked as authenticated');
    } else {
      console.log('No token found. User is NOT authenticated.');
    }
  }
  

  login(username: string, password: string): Observable<any> {
    // Using POST with form data (recommended for credentials)
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post(this.loginUrl, formData).pipe(
      tap((res: any) => {
        if (res.token) {
          this.isAuthenticated = true;
          this.token = res.token;
          localStorage.setItem(JWT_TOKEN_ENTRY, res.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.clearAuth();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearAuth();
  }

  private clearAuth(): void {
    this.isAuthenticated = false;
    this.token = '';
    localStorage.removeItem(JWT_TOKEN_ENTRY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWTTOKEN');
  }
  
  
}























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// const JWT_TIKEN_ENTRY="JWTTOKEN";

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   private isAuthenticated = false; 
// loginUrl:string='https://wosh-dev.herokuapp.com/api/authorization/administrator/login'; //  http://api.wosh.co.il 
// public token:string=""
// constructor(private httpClient: HttpClient) {
//   const savedToken = localStorage.getItem(JWT_TIKEN_ENTRY);
//   if (savedToken) {
//     this.token = savedToken;
//     this.isAuthenticated = true; 
//   }
// }


//   login(username: string, password: string, success:Function,failure:Function) //: boolean
//    {
//     // if (email === 'admin@wosh.co.il' && password === 'admin@wosh') { 
//     //   this.isAuthenticated = true;
//     //   return true;
//     // }
//     // this.isAuthenticated = false;
//     // return false;
//     this.httpClient.get(this.loginUrl+'?username=${username}&password=${password}').subscribe({
// next:(res:any)=>{
//   if(res.token){
//     this.isAuthenticated = true;
//     this.token = res.token;
//     localStorage.setItem(JWT_TIKEN_ENTRY, res.token);
//     success();
//   }
//   else{
//     this.isAuthenticated = false;
//     failure();
//   }
//   // ,
//   // error:(err)=>
//   // {
//   //   console.error('Login failed', err);
//   //   this.isAuthenticated = false;
//   //   failure();
//   // }
// }
//     })
//   }

//   logout(): void {
//     this.isAuthenticated = false;
//     this.token = '';
//     localStorage.removeItem(JWT_TIKEN_ENTRY);
//   }


//   isLoggedIn(): boolean {
//     return this.isAuthenticated;
//   }
// }
