import { DevService } from '../../../services/dev.service';
import { OrdersService } from '../../../services/orders.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');

@Component({
  selector: 'app-orderselectfilter',
  templateUrl: './orderSelectFilter.component.html',
  styleUrls: ['./orderSelectFilter.component.css']
})
export class OrderSelectFilterComponent  {
  private orderNumber;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService,
  ) { }

    purchaseOrder   = true;
    orderSelectView = null;

    toggleMode() {
      this.purchaseOrder = !this.purchaseOrder;
    }

  loadPurchaseOrderDetails(form: NgForm) {
    const purchaseOrderNumber = form.value.purchaseOrderNumber;

    if (purchaseOrderNumber === '') {
      alertify.error('Order number is required');
    } else {
        this.ordersService.orderID  = purchaseOrderNumber;
        this.ordersService.detailMode = 'PurchaseOrder';
        this.router.navigate(['/admin/orders/detail']);
    }
  }

  loadRequisitionOrderDetails(form: NgForm) {
    const requisitionOrderNumber = form.value.requisitionOrderNumber;

    if (requisitionOrderNumber === '') {
      alertify.error('Order number is required');
    } else {
        this.ordersService.orderID  = requisitionOrderNumber;
        this.ordersService.detailMode = 'Order';
        this.router.navigate(['/admin/orders/detail']);
    }
  }
}
