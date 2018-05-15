import { Order } from '../models/order.model';
import { MaterialDetail } from '../models/materialDetail.model';
import { OrderList } from '../models/orderList.model';
import { PurchaseOrderList } from '../models/purchaseOrderList.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class OrdersService {
  orderListChanged = new EventEmitter<OrderList>();
  orderDetailLoader = new EventEmitter<Order>();
  purchaseOrderListChanged = new EventEmitter<PurchaseOrderList>();
  query = '?';
  listMode = 'Orders';
  orderID = '1522752908121';
  detailMode = 'Order';
  domain = this.devService.domain;
  constructor(private http: HttpClient, private devService: DevService) { }

  
  fetchOrders(state, mode, projectID, townshipID, erfID, PUAID, buildingID) {
    console.log(this.query);
    if (projectID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'projectID=' + projectID;
    }
    if (townshipID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'townshipID=' + townshipID;
    }
    if (erfID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'erfID=' + erfID;
    }
    if (PUAID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'PUAID=' + PUAID;
    }
    if (buildingID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'buildingID=' + buildingID;
    }
    if (state !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'state=' + state;
    }
    if (mode !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'mode=' + mode;
    }
    console.log('https://' + this.domain + '/api/v1/orders/' + this.query);
      this.http.get<OrderList>('https://' + this.domain + '/api/v1/orders/' + this.query).subscribe(
        resp => {
          this.query = '?';
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
  fetchDetailedOrder() {
    console.log('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=' + this.detailMode);
      this.http.get<Order>('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=' +  this.detailMode).subscribe(
        resp => {
          this.query = '?';
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
  fetchPurchaseOrders() {
    console.log('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=purchaseOrders');
      this.http.get<PurchaseOrderList>('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=purchaseOrders').subscribe(
        resp => {
          this.query = '?';
          if (resp) {
            this.purchaseOrderListChanged.emit(resp);
          } else {
            this.purchaseOrderListChanged.emit(null);
          }

        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
  }
  fetchCheckOutStock(placedBy, projectID) {
    console.log('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=CheckOutStock&placedBy=' + placedBy + '&projectID=' + projectID);
      this.http.get<Order>('https://' + this.domain + '/api/v1/orders/' + this.orderID + '/mode=CheckOutStock&placedBy=' + placedBy + '&projectID=' + projectID).subscribe(
        resp => {
          this.query = '?';
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
