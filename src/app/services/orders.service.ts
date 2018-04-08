import { Order } from '../models/order.model';
import { MaterialDetail } from '../models/materialDetail.model';
import { OrderList } from '../models/orderList.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class OrdersService {
  orderListChanged = new EventEmitter<OrderList>();
  orderDetailLoader = new EventEmitter<Order>();
  query = '';
  listMode = 'Orders';
  orderID = null;
  domain = this.devService.domain;
  constructor(private http: HttpClient, private devService: DevService) { }

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
    console.log('https://' + this.domain + '/api/v1/orders/?' + this.query);
      this.http.get<OrderList>('https://' + this.domain + '/api/v1/orders/?' + this.query).subscribe(
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
  fetchDetailedOrder(mode) {
    console.log('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/' + this.query);
      this.http.get<Order>('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/' + this.query).subscribe(
        resp => {
          this.query = '';
          if (resp) {
            this.orderDetailLoader.emit(resp);
          } else {
            this.orderDetailLoader.emit(null);
          }

        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
  }
}
