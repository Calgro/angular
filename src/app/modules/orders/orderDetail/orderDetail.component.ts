import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../models/order.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderDetail.component.html',
  styleUrls: ['./orderDetail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order = new Order(null, null, null, null, null, null, null);
  orderLoaded = false;
  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    // ORDERS
      this.ordersService.orderDetailLoader.subscribe(
          (order: Order) => {
              console.log(order);
              if (order !== null) {
                this.order = order;
              }
              this.orderLoaded = true;
           }
        );
      
      this.ordersService.fetchDetailedOrder('Orders');
  }

}
