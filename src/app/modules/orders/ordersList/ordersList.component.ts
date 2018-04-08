import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { OrderList } from '../../../models/orderList.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderslist',
  templateUrl: './ordersList.component.html',
  styleUrls: ['./ordersList.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: OrderList = new OrderList(null,null);
  noOrders = false;
  ordersLoaded = false;
  listMode = this.ordersService.listMode;
  
  constructor(
    private ordersService: OrdersService,
    private router: Router
      ) { }

  ngOnInit() {
    console.log(this.listMode);
    // ORDERS
      this.ordersService.orderListChanged.subscribe(
          (orders: OrderList) => {
              console.log(orders);
              if (orders !== null) {
                this.orders = orders;
              } else {
                this.noOrders = true;
              }
              this.ordersLoaded = true;
           }
        );
      
      this.ordersService.fetchOrders(null, this.listMode);
  }
  loadDetailed(orderID) {
    this.ordersService.orderID = orderID;
    this.router.navigate(['/admin/orders/detail']);
  }
}
