import { ContractsService } from '../../../services/contracts.service';
import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contractsdetail',
  templateUrl: './contractsDetail.component.html',
  styleUrls: ['./contractsDetail.component.css']
})
export class ContractsDetailComponent implements OnInit {
//  order: Order = new Order(null, null, null, null, null, null, null, null);
//  orderLoaded = false;
//  showDetail = false;
//  listMode = this.ordersService.listMode;
  constructor(
    private contractsService: ContractsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
//     ORDERS
//      this.ordersService.orderDetailLoader.subscribe(
//          (order: Order) => {
//              console.log(order);
//              if (order !== null) {
//                this.order = order;
//              }
//              this.orderLoaded = true;
//           }
//        );
//      
//      this.ordersService.fetchDetailedOrder();
  }
  
  editContract() {
//    this.router.navigate(['/admin/orders/editSupplier']);
  }
  
  deleteContract() {
//    this.router.navigate(['/admin/orders/editDelivery']);
  }  

}

