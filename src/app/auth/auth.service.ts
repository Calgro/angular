import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  token: string;
  
  constructor() { }

  public isAuthenticated(): boolean {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
   // return true;
  }

  public decodeToken() {
    return this.jwtHelper.decodeToken(this.token);
  }
  
  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
    
  }
  
  
}
