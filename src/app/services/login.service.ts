import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const JWT_TIKEN_ENTRY="JWTTOKEN";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated = false; 
loginUrl:string='https://api.wosh.co.il/api/authorization/administrator/login'; // ? http://api.wosh.co.il 
public token:string=""
constructor(private httpClient: HttpClient) {
  const savedToken = localStorage.getItem(JWT_TIKEN_ENTRY);
  if (savedToken) {
    this.token = savedToken;
    this.isAuthenticated = true; 
  }
}


  login(username: string, password: string, success:Function,failure:Function) //: boolean
   {
    // if (email === 'admin@wosh.co.il' && password === 'admin@wosh') { 
    //   this.isAuthenticated = true;
    //   return true;
    // }
    // this.isAuthenticated = false;
    // return false;
    this.httpClient.get(this.loginUrl+'?username=${username}&password=${password}').subscribe({
next:(res:any)=>{
  if(res.token){
    this.isAuthenticated = true;
    this.token = res.token;
    localStorage.setItem(JWT_TIKEN_ENTRY, res.token);
    success();
  }
  else{
    this.isAuthenticated = false;
    failure();
  }
  // ,
  // error:(err)=>
  // {
  //   console.error('Login failed', err);
  //   this.isAuthenticated = false;
  //   failure();
  // }
}
    })
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = '';
    localStorage.removeItem(JWT_TIKEN_ENTRY);
  }


  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
