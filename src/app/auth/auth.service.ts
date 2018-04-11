import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  //token: string;
  
  // DEV TOKEN
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxNDUyNzU0NDU3IiwiZW1haWxBZGRyZXNzIjoiQnJpYW5LQGNhbGdyb20zLmNvbSIsImV4cCI6MTUyMjkzOTYwMCwidXNlclRpdGxlIjoiSVQgTWFuYWdlciIsIm5hbWUiOiJCcmlhbiBLbm90dCIsInBlcm1pc3Npb25zIjp7IlVzZXIgTWFuYWdlbWVudCI6WyJWaWV3IFVzZXJzIiwiRWRpdCBVc2VycyIsIkFkZCBVc2VycyIsIkVkaXQgVXNlciBQZXJtaXNzaW9ucyIsIkFkZCBVc2VyIFBlcm1pc3Npb25zIiwiVmlldyBVc2VyIFBlcm1pc3Npb25zIiwiRGVsZXRlIFVzZXJzIiwiUmVzZXQgVXNlciBQYXNzd29yZCIsIlZpZXcgU2l0ZSBBY2Nlc3MiLCJBZGQgU2l0ZSBBY2Nlc3MiLCJFZGl0IFNpdGUgQWNjZXNzIl0sIkVyZiBNYW5hZ2VtZW50IjpbIlZpZXcgQnVpbGRpbmdzIiwiVmlldyBFcnZlbiIsIkVkaXQgRXJ2ZW4iLCJSZW1vdmUgRXJ2ZW4iLCJBZGQgRXJ2ZW4iXSwiUHJvamVjdCBNYW5hZ2VtZW50IjpbIlZpZXcgUHJvamVjdHMiXSwiVG93bnNoaXAgTWFuYWdlbWVudCI6WyJWaWV3IFRvd25zaGlwcyJdLCJQcm9jdXJlbWVudCI6WyJWaWV3IE9yZGVycyJdLCJQYXltZW50IFJlY29uIjpbIlZpZXcgUmVjb24iXSwiVmlydHVhbCBGaWxlIjpbIlZpZXcgRG9jdW1lbnRzIiwiQWRkIERvY3VtZW50cyIsIkVkaXQgRG9jdW1lbnRzIiwiUmVtb3ZlIERvY3VtZW50cyIsIkFyY2hpdmUgRG9jdW1lbnRzIl0sIkh1YiI6WyJWaWV3IExvZ2ljIEl0ZW1zIiwiQWRkIExvZ2ljIEl0ZW1zIiwiRWRpdCBMb2dpYyBJdGVtcyIsIlJlbW92ZSBMb2dpYyBJdGVtcyIsIlZpZXcgUHJvY2VzcyBGbG93cyIsIkFkZCBQcm9jZXNzIEZsb3dzIiwiRWRpdCBQcm9jZXNzIEZsb3dzIiwiUmVtb3ZlIFByb2Nlc3MgRmxvd3MiLCJWaWV3IEFsZXJ0cyIsIkVkaXQgQWxlcnRzIl0sIlBsYWNlIE9yZGVycyI6WyJWaWV3Il0sIlByb2Nlc3MgT3JkZXJzIjpbIlZpZXciXX19.be8q7FZKiLPwHb91qHivlN-fVJNUYaT5Q9QcgnSeIdc";
  
  constructor() { }

  public isAuthenticated(): boolean {
   // return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
    return true;// DEV ONLY!
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
