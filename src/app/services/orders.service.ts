import { MaterialDetail } from '../models/materialDetail.model';
import { OrderList } from '../models/orderList.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class OrdersService {
  orderListChanged = new EventEmitter<OrderList>();
  query = '';

  constructor(private http: HttpClient) { }

  fetchOrders(state, mode) {
    if (state !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'state=' + state;
    }
    if (mode !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'mode=' + mode;
    }
    console.log('https://www.calgrois.co.za/api/v1/orders/?' + this.query);
      this.http.get<OrderList>('https://www.calgrois.co.za/api/v1/orders/?' + this.query).subscribe(
        resp => {
          this.query = '';
          if (resp) {
            this.orderListChanged.emit(resp);
          } else {
            this.orderListChanged.emit(null);
          }
          
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
  }
  
}
