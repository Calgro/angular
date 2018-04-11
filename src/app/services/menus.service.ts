import { MenuGroup } from '../models/menuGroup.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class MenusService {
  menuChanged = new EventEmitter<MenuGroup[]>();
  
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchMenus() {
    this.http.get<MenuGroup[]>('https://' + this.devService.domain + '/api/v1/menus').subscribe(
      resp => {
        console.log(resp);
        this.menuChanged.emit(resp);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
