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
private login = require('../images/login.jpg');

  ngOnInit() { }

  onSignIn(form: NgForm) {
    const name    = form.value.name;
    const surname = form.value.surname;
    const ID      = form.value.ID;
    const cell    = form.value.cell;
    const email   = form.value.email;
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('ID', ID);
    formData.append('cell', cell);
    formData.append('email', email);

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
