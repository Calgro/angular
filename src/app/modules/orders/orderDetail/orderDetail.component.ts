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
  order: Order = new Order(null, null, null, null, null, null, null, null);
  orderLoaded = false;
  showDetail = false;
  listMode = this.ordersService.listMode;
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
      
      this.ordersService.fetchDetailedOrder();
  }
  showDetailToggle(){
      this.showDetail = !this.showDetail;
    }
  editSupplier() {
    this.router.navigate(['/admin/orders/editSupplier']);
  }
  editDelivery() {
    this.router.navigate(['/admin/orders/editDelivery']);
  }
}
