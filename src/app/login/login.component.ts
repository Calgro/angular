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
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private menusService: MenusService) { }
  private login = require('../images/login.jpg');

  onSignIn(form: NgForm) {
    const name    = form.value.name;
    const surname = form.value.surname;
    const cell    = form.value.cell;
    const email   = form.value.email;
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('cell', cell);
    formData.append('email', email);

    if (name === '') {
      alertify.error('First Name is required');
    } else if (surname === '') {
        alertify.error('Surname is required');
    } else if (cell === '') {
        alertify.error('Cell Number is required');
    } else if ((cell.toString()).length !== 9) {
        alertify.error('Please enter a valid Cell Number');
    } else if (email === '') {
        alertify.error('Email Address is required');
    } else {
      
      
console.log(formData[0]);
console.log(name);
console.log(surname);
console.log(cell);
console.log(email);
            
            
      this.http.post('https://www.calgrois.co.za/api/v1/calgroM3Connect', formData).subscribe(
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
}
