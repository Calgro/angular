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
  POPIConfirmation = 'null';


  SignInData = {
    'name': null,
    'surname': null,
    'cell': null,
    'email': null,
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private menusService: MenusService) { }
  private login = require('../images/CalgroM3Connect.jpg');
  private logo = require('../images/logo.png');

  onSignIn(form: NgForm) {
    const name    = form.value.name;
    const surname = form.value.surname;
    const cell    = form.value.cell;
    const email   = form.value.email;
    const POPIConfirmation = form.value.POPIConfirmation;

    if (name === '') {
      alertify.error('First Name is required');
    } else if (surname === '') {
        alertify.error('Surname is required');
    } else if ((cell.toString()).length !== 9) {
        alertify.error('Please enter a valid Cell Number');
    } else if (email === '') {
        alertify.error('Email Address is required');
    } else if (POPIConfirmation !== true) {
        alertify.error('Please confirm your agreement to the POPI T&Cs');
    } else {
        this.SignInData.name    = name;
        this.SignInData.surname = surname;
        this.SignInData.cell    = '0' + cell.toString();
        this.SignInData.email   = email;

      this.http.post('https://www.calgrois.co.za/api/v1/calgroM3Connect', this.SignInData).subscribe(
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
