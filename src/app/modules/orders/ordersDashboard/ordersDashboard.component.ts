import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { OrderDashboard } from '../../../models/orderDashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersdashboard',
  templateUrl: './ordersDashboard.component.html',
  styleUrls: ['./ordersDashboard.component.css']
})

export class OrdersDashboardComponent implements OnInit {
  orders: OrderDashboard = new OrderDashboard(null, null, null, null, null, null, null);
  noOrders = false;
  chartDataLoaded = false;
  // Overall Orders
  overallOrdersLabel:string[] = [];
  overallOrders:number[] = [];
  public overallOrdersColors:Array<any> = [{ // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  // Internal Sales
  internalOrdersLabel:string[] = [];
  internalOrders:number[] = [];
  // External Sales
  externalOrdersLabel:string[] = [];
  externalOrders:number[] = [];
  // Deliveries
  deliveriesLabel:string[] = [];
  deliveries:number[] = [];
  doughnutChartType:string = 'doughnut';
  ordersSubscription;
  // events
  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
 
    constructor(
      private ordersService: OrdersService,
      private router: Router
    
    ) {}
    

  ngOnInit() {
    
    // ORDERS
      this.ordersSubscription = this.ordersService.orderListChanged.subscribe(
          (orders: OrderDashboard) => {
              console.log(orders);
              if (orders !== null) {
                this.orders = orders;
                this.deliveriesLabel[0] = 'Ordered';
                this.deliveriesLabel[1] = 'Delivered';
                this.deliveriesLabel[2] = 'Checked-Out';
                
                
                this.deliveries[0] = this.orders.qtyOrdered;
                this.deliveries[1] = this.orders.qtyDelivered;
                this.deliveries[2] = this.orders.qtyCheckedOut;
                this.overallOrdersLabel[0] = 'Internal Orders';
                this.overallOrdersLabel[1] = 'External Orders';
                this.overallOrders[0] = this.orders.internalOrderTotal;
                this.overallOrders[1] = this.orders.externalOrderTotal;
                let n: number;
                for (n = 0; n <= (this.orders.internalOrderTotals.length) - 1; n++) {
                  const internalOrder = this.orders.internalOrderTotals[n];
                  this.internalOrdersLabel[n] = internalOrder.state;
                  this.internalOrders[n] = internalOrder.total;
                }
                for (n = 0; n <= (this.orders.externalOrderTotals.length) - 1; n++) {
                  const externalOrder = this.orders.externalOrderTotals[n];
                  this.externalOrdersLabel[n] = externalOrder.state;
                  this.externalOrders[n] = externalOrder.total;
                }
                this.chartDataLoaded = true;

              } else {
                this.noOrders = true;
              }
           }
        );
      
      this.ordersService.fetchOrders(null, 'Dashboard', null, null, null, null, null);
  }
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
  loadInternal() {
    this.ordersService.listMode = 'Orders';
    this.ordersService.detailMode = 'Order';
    this.router.navigate(['/admin/orders/list']);
  }
  loadExternal() {
    this.ordersService.listMode = 'purchaseOrders';
    this.ordersService.detailMode = 'PurchaseOrder';
    this.router.navigate(['/admin/orders/list']);
  }
  loadDeliveries() {
    this.ordersService.listMode = 'Stock';
    this.ordersService.detailMode = 'PurchaseOrder';
    this.router.navigate(['/admin/orders/filter']);
  }
}
