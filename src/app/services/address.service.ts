import { DeliveryAddressDetail } from '../models/deliveryAddressDetail.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class AddressService {
  deliveryAddressListChanged = new EventEmitter<DeliveryAddressDetail[]>();

  constructor(private http: HttpClient) { }

  fetchDeliveryAddresses() {
    this.http.get<DeliveryAddressDetail[]>('https://www.calgrois.co.za/api/v1/deliveryAddresses/').subscribe(
      resp => {
        if (resp) {
          this.deliveryAddressListChanged.emit(resp);
        } else {
          this.deliveryAddressListChanged.emit([new DeliveryAddressDetail('', 'None Found', '')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
