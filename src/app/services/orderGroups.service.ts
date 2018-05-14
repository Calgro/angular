import { OrderGroups } from '../models/orderGroups.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class OrderGroupsService {
  orderGroupsListChanged = new EventEmitter<OrderGroups>();
  domain = this.devService.domain;
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchOrderGroups() {
    this.http.get<OrderGroups>('https://' + this.domain + '/api/v1/orderGroups/').subscribe(
        resp => {
          if (resp) {
            this.orderGroupsListChanged.emit(resp);
          } else {
            this.orderGroupsListChanged.emit(null);
          }

        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
  }
  
}
