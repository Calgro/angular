import { Outcome } from '../../../models/outcome.model';
import { DeliveryAddressDetail } from '../../../models/deliveryAddressDetail.model';
import { DeliveryAddresses } from '../../../models/deliveryAddresses.model';
import { DevService } from '../../../services/dev.service';
import { OrdersService } from '../../../services/orders.service';
import { AddressService } from '../../../services/address.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');
@Component({
  selector: 'app-ordersdeliveryform',
  templateUrl: './ordersDeliveryform.component.html',
  styleUrls: ['./ordersDeliveryform.component.css']
})
export class OrdersDeliveryFormComponent implements OnInit {
  deliverySubscription;
  supplierID = 'instruction';
  defaultAddress: DeliveryAddressDetail = new DeliveryAddressDetail(null, null, null);
  addresses: DeliveryAddresses = new DeliveryAddresses([this.defaultAddress]);
  deliveryAddressID = 'instruction';
  constructor(
    private addressService: AddressService,
    private ordersService: OrdersService,
    private http: HttpClient,
    private devService: DevService,
    private router: Router
  ) { }

  ngOnInit() {
    
    // DELIVERY ADDRESSES
    // ADDRESSES
      this.addressService.deliveryAddressListChanged.subscribe(
          (addresses: DeliveryAddresses) => {
              this.addresses = addresses;
            }
        );
      this.addressService.fetchDeliveryAddresses(null);
  }
  updateDelivery(form: NgForm) {
    console.log(form.value.deliveryAddressID);
    const supplierData = {
        'PONumber': this.ordersService.orderID,
          'deliveryAddressID': form.value.deliveryAddressID
      };
    console.log(supplierData);
    this.router.navigate(['/admin/orders/detail']);
    this.http.put('https://' + this.devService.domain + '/api/v1/orders', supplierData).subscribe(
              (resp: Outcome) => {
                console.log(resp);
                if (resp.statusCode === '200') {
                  alertify.success(resp.message);
                  }
              },
              (error: HttpErrorResponse) => {
                alertify.error(error.status + ' - ' + error.statusText);
               }
            );
    }
}
