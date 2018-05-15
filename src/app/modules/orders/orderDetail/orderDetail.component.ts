import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../models/order.model';
import { Outcome } from '../../../models/outcome.model';
import { DevService } from '../../../services/dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
const alertify = require('alertify.js');
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderDetail.component.html',
  styleUrls: ['./orderDetail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order = new Order(null, null, null, null, null, null, null, null, null);
  orderLoaded = false;
  showDetail = false;
  listMode = this.ordersService.listMode;
  backgroundAlert;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService,
    
  ) { }
  uploadData = {
    'mode': 'Upload To Buildsmart',
    'PONumber': this.ordersService.orderID
  };
  emailData = {
    'mode': 'Email To Supplier',
    'PONumber': this.ordersService.orderID
  };
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
  uploadToBuildsmart() {
    alertify.success("Uploading to Buildsmart. This may take some time. Once completed you will be notified.");
    this.backgroundAlert = Observable.interval(1000 * 60).subscribe(x => {
      alertify.success("Upload to Buildsmart still running. This may take some time. Once completed you will be notified.");
    });
    this.http.post('https://' + this.devService.domain + '/api/v1/orders', this.uploadData).subscribe(
                  (resp: Outcome) => {
                    if (resp.statusCode === '200') {
                      alertify.success(resp.message);
                      this.backgroundAlert.unsubscribe();
                     }
                  },
                  (error: HttpErrorResponse) => {
                    alertify.error(error.status + ' - ' + error.statusText);
                    this.backgroundAlert.unsubscribe();
                     
                   }
                );
  }
   emailToSupplier() {
    alertify.success("Emailing to Supplier. This may take some time. Once completed you will be notified.");
    this.http.post('https://' + this.devService.domain + '/api/v1/orders', this.emailData).subscribe(
                  (resp: Outcome) => {
                    if (resp.statusCode === '200') {
                      alertify.success(resp.message);
                      
                     }
                  },
                  (error: HttpErrorResponse) => {
                    alertify.error(error.status + ' - ' + error.statusText);
                     
                   }
                );
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
