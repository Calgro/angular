import { OrdersService } from '../../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');

@Component({
  selector: 'app-orderselectfilter',
  templateUrl: './orderSelectFilter.component.html',
  styleUrls: ['./orderSelectFilter.component.css']
})
export class OrderSelectFilterComponent implements OnInit {
  private orderNumber;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit() {}


  loadOrderDetails(form: NgForm) {
console.log('Testing ' this.orderNumber);

//    this.ordersService.listMode = listMode;
//    this.ordersService.orderID = orderID;
    this.router.navigate(['/admin/orders/detail']);
  }
}
