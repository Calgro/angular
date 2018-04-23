import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MenusService } from '../services/menus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';



const alertify = require('alertify.js');
    
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private http: HttpClient, private router: Router, private authService: AuthService, private menusService: MenusService) { }
private mempark = require('../images/mempark.jpg');
  
  ngOnInit() { }
  

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
        
    this.http.post('https://www.calgrois.co.za/api/v1/login', formData).subscribe(
      resp => {
        console.log(resp);
        this.authService.setToken(resp['JWT']);
        const token = this.authService.getToken();

        if (this.authService.isAuthenticated()) {
          this.menusService.fetchMenus();
          this.router.navigate(['/admin']);
          
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );

  }

}
