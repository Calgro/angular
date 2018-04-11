import { Outcome } from '../../../models/outcome.model';
import { Suppliers } from '../../../models/suppliers.model';
import { DevService } from '../../../services/dev.service';
import { OrdersService } from '../../../services/orders.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');
@Component({
  selector: 'app-orderssupplierform',
  templateUrl: './orderssupplierform.component.html',
  styleUrls: ['./orderssupplierform.component.css']
})
export class OrdersSupplierFormComponent implements OnInit {
  suppliers: Suppliers = new Suppliers([]);
  suppliersSubscription;
  supplierID = 'instruction';
  constructor(
    private suppliersService: SuppliersService,
    private ordersService: OrdersService,
    private http: HttpClient,
    private devService: DevService,
    private router: Router
  ) { }

  ngOnInit() {
    // SUPPLIERS
    this.suppliersSubscription = this.suppliersService.supplierListChanged.subscribe(
        (suppliers: Suppliers) => {
            this.suppliers = suppliers;
         }
      );

    this.suppliersService.fetchSuppliers();
  }
  updateSupplier(form: NgForm) {
    console.log(form.value.supplierID);
    const supplierData = {
        'PONumber': this.ordersService.orderID,
          'supplierID': form.value.supplierID
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
