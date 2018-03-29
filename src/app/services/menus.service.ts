import { MenuGroup } from '../models/menuGroup.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class MenusService {
  menuChanged = new EventEmitter<MenuGroup[]>();
  
  constructor(private http: HttpClient) { }

  fetchMenus() {
    this.http.get<MenuGroup[]>('https://www.calgrois.co.za/api/v1/menus').subscribe(
      resp => {
        this.menuChanged.emit(resp);
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
