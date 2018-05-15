import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { PurchaseOrderList } from '../../../models/purchaseOrderList.model';
import { FilterService } from '../../../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchaseorderlist',
  templateUrl: './purchaseOrderList.component.html',
  styleUrls: ['./purchaseOrderList.component.css']
})
export class PurchaseOrderListComponent implements OnInit {
  purchaseOrders: PurchaseOrderList = new PurchaseOrderList(null);
  noOrders = false;
  ordersLoaded = false;
  ordersSubscription;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private filterService: FilterService
      ) { }
  
  ngOnInit() {
   
    // PURCHASE ORDERS
      this.ordersSubscription = this.ordersService.purchaseOrderListChanged.subscribe(
          (purchaseOrders: PurchaseOrderList) => {
              console.log(purchaseOrders);
              if (purchaseOrders !== null) {
                this.purchaseOrders = purchaseOrders;
                console.log(purchaseOrders);
              } else {
                this.noOrders = true;
              }
              this.ordersLoaded = true;
           }
        );
      
      this.ordersService.fetchPurchaseOrders();
  }
  loadDetailed(PONumber) {
    this.ordersService.orderID = PONumber;
    if (this.ordersService.listMode === 'Stock') {
      this.router.navigate(['/admin/orders/stock']);
    } else {
      this.router.navigate(['/admin/orders/detail']);
    }
  }
  loadFilter() {
    this.router.navigate(['/admin/orders/filter']);
  }
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

}
