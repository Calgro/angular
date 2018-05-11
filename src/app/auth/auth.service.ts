import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  //token: string;
  
  // DEV TOKEN
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxNTE5OTA3NTc0NDUxIiwiZW1haWxBZGRyZXNzIjoiZG9taW5pcXVlY0BjYWxncm9tMy5jb20iLCJleHAiOjE3MTYyMzkwMjIsInVzZXJUaXRsZSI6IkRldmVsb3BlciIsIm5hbWUiOiJEb21pbmlxdWUgQ29vcGVyIn0.LjFDn0fgP6q_Bbm_umDODouKyWsMYrlXxBp32GDwV3M";
  
  constructor() { }

  public isAuthenticated(): boolean {
   // return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
   return true;// DEV ONLY!
  }

  public decodeToken() {
    console.log(this.jwtHelper.decodeToken(this.token));
    return this.jwtHelper.decodeToken(this.token);
  }
  
  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }
  
  public getUserName() {
    const decodedToken = this.decodeToken();
    console.log(decodedToken.name);
    return decodedToken.name;
  }
  
  
}
