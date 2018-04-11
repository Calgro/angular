import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  token: string;
  
  // DEV TOKEN
  //token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxNDUyNzU0NDU3IiwiZW1haWxBZGRyZXNzIjoiQnJpYW5LQGNhbGdyb20zLmNvbSIsImV4cCI6MTUyMzI4OTk0NywidXNlclRpdGxlIjoiSVQgTWFuYWdlciAmIFNlbmlvciBEZXZlbG9wZXIiLCJuYW1lIjoiQnJpYW4gS25vdHQiLCJwZXJtaXNzaW9ucyI6eyJVc2VyIE1hbmFnZW1lbnQiOlsiVmlldyBVc2VycyIsIkVkaXQgVXNlcnMiLCJBZGQgVXNlcnMiLCJFZGl0IFVzZXIgUGVybWlzc2lvbnMiLCJBZGQgVXNlciBQZXJtaXNzaW9ucyIsIlZpZXcgVXNlciBQZXJtaXNzaW9ucyIsIkRlbGV0ZSBVc2VycyIsIlJlc2V0IFVzZXIgUGFzc3dvcmQiLCJWaWV3IFNpdGUgQWNjZXNzIiwiQWRkIFNpdGUgQWNjZXNzIiwiRWRpdCBTaXRlIEFjY2VzcyJdLCJFcmYgTWFuYWdlbWVudCI6WyJWaWV3IEJ1aWxkaW5ncyIsIlZpZXcgRXJ2ZW4iLCJFZGl0IEVydmVuIiwiUmVtb3ZlIEVydmVuIiwiQWRkIEVydmVuIl0sIlByb2plY3QgTWFuYWdlbWVudCI6WyJWaWV3IFByb2plY3RzIl0sIlRvd25zaGlwIE1hbmFnZW1lbnQiOlsiVmlldyBUb3duc2hpcHMiXSwiUHJvY3VyZW1lbnQiOlsiVmlldyBPcmRlcnMiXSwiUGF5bWVudCBSZWNvbiI6WyJWaWV3IFJlY29uIl0sIlZpcnR1YWwgRmlsZSI6WyJWaWV3IERvY3VtZW50cyIsIkFkZCBEb2N1bWVudHMiLCJFZGl0IERvY3VtZW50cyIsIlJlbW92ZSBEb2N1bWVudHMiLCJBcmNoaXZlIERvY3VtZW50cyJdLCJIdWIiOlsiVmlldyBMb2dpYyBJdGVtcyIsIkFkZCBMb2dpYyBJdGVtcyIsIkVkaXQgTG9naWMgSXRlbXMiLCJSZW1vdmUgTG9naWMgSXRlbXMiLCJWaWV3IFByb2Nlc3MgRmxvd3MiLCJBZGQgUHJvY2VzcyBGbG93cyIsIkVkaXQgUHJvY2VzcyBGbG93cyIsIlJlbW92ZSBQcm9jZXNzIEZsb3dzIiwiVmlldyBBbGVydHMiLCJFZGl0IEFsZXJ0cyJdLCJQbGFjZSBPcmRlcnMiOlsiVmlldyJdLCJQcm9jZXNzIE9yZGVycyI6WyJWaWV3Il0sIk9yZGVycyI6WyJWaWV3Il19fQ.hWV0qa-YAfs59DkgXtL8bSdZaya-7p7W7RtP1DlCXVk";
  
  constructor() { }

  public isAuthenticated(): boolean {
   return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
    //return true;// DEV ONLY!
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
