import { DeliveryAddressDetail } from '../models/deliveryAddressDetail.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class AddressService {
  deliveryAddressListChanged = new EventEmitter<DeliveryAddressDetail[]>();

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchDeliveryAddresses() {
    this.http.get<DeliveryAddressDetail[]>('https://' + this.devService.domain + '/api/v1/deliveryAddresses/').subscribe(
      resp => {
        console.log(resp);
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
