import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.model';
import { Outcome } from '../../models/outcome.model';
import { DevService } from '../../services/dev.service';
import { FilterService } from '../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  ordersForm: FormGroup;
  order: Order = new Order(null, null, null, null, null, null, null, null);
  ordersLoaded = false;
  showDetail = false;
  listMode = this.ordersService.listMode;
  stockMode = this.filterService.stockMode;
  constructor(
    private ordersService: OrdersService,
    private http: HttpClient,
    private router: Router,
    private devService: DevService,
    private filterService: FilterService
  ) { }
  checked = '';
  deliveryData = {
          'mode': 'Check-In',
          'PONumber': this.ordersService.orderID,
           'materials': [{
              'materialID': null,
             'checkedin': true,
             'quantity' : null,
           }]
  };
  checkoutData = {
          'mode': 'Check-Out',
          'placedBy': this.filterService.placedBy,
          'projectID': this.filterService.projectID,
           'materials': [{
              'materialID': null,
             'quantity' : null,
           }]
        };
  ngOnInit() {
    this.ordersForm = new FormGroup({
                  'items': new FormArray([])
              });
    // ORDERS
      this.ordersService.orderDetailLoader.subscribe(
          (order: Order) => {
              console.log(order);
              if (order !== null) {
                this.order = order;
                let i: number;
                for (i = 0; i <= (this.order.items.length) - 1; i++) {
                    const controlGroupCheckIn = new FormGroup({
                                                            'state': new FormControl(false),
                                                            'materialID': new FormControl(this.order.items[i].materialID),
                                                            'quantityOrdered': new FormControl(this.order.items[i].quantity),
                                                            'quantityAlreadyDelivered': new FormControl(this.order.items[i].quantityDelivered),
                                                            'quantityDelivered': new FormControl(0),
                                                            'quantityRemaining': new FormControl(this.order.items[i].quantity - this.order.items[i].quantityDelivered),
                                                            'description': new FormControl(this.order.items[i].description)
                                                        });
                   const controlGroupCheckOut = new FormGroup({
                                                            'state': new FormControl(false),
                                                            'materialID': new FormControl(this.order.items[i].materialID),
                                                            'quantityOrdered': new FormControl(this.order.items[i].quantity),
                                                            'quantityCheckedOut': new FormControl(this.order.items[i].quantityCheckedOut),
                                                            'quantityIssued': new FormControl(0),
                                                            'quantityRemaining': new FormControl(this.order.items[i].quantityDelivered - this.order.items[i].quantityCheckedOut),
                                                            'description': new FormControl(this.order.items[i].description)
                                                        });
                   
                    if (this.stockMode === 'Check-In') {
                      (<FormArray>this.ordersForm.get('items')).push(controlGroupCheckIn);
                    } else {
                      (<FormArray>this.ordersForm.get('items')).push(controlGroupCheckOut);
                    }
                    
                }
              }
              this.ordersLoaded = true;
           }
        );
      if (this.filterService.stockMode === 'Check-In') {
        this.ordersService.fetchDetailedOrder();
      } else {
        this.ordersService.fetchCheckOutStock(this.filterService.placedBy, this.filterService.projectID);
      }
  }
  
  onChange(index) {
      const fArray = <FormArray>this.ordersForm.controls.items;
      const fGroup = <FormGroup>fArray.controls[index];
      console.log(fGroup);
      if (fGroup.controls.quantityDelivered.value > 0) {
        fGroup.controls.state.setValue(true);
      } else {
        fGroup.controls.state.setValue(false);
      }
    }
  onAll(index) {
      const fArray = <FormArray>this.ordersForm.controls.items;
      const fGroup = <FormGroup>fArray.controls[index];
      console.log(fGroup.controls.quantityOrdered.disabled);
      if (this.filterService.stockMode === 'Check-In') {
        fGroup.controls.quantityDelivered.setValue(fGroup.controls.quantityRemaining.value);
        this.onChange(index);
      } else {
        fGroup.controls.quantityIssued.setValue(fGroup.controls.quantityRemaining.value);
      }
      
    }
   // CHECK ALL BOXES
    checkToggle() {
      if (this.checked === '') {
        this.checked = 'checked';
        
      } else {
        this.checked = '';
      }
    }
    saveChanges() {
      if (!this.ordersForm.valid) {
        alertify.error('You have specified an amount over the limit. See the field in red.');
      } else {
        if (this.filterService.stockMode === 'Check-In') {
          alertify.success('Checking-in stock. You will be notified once complete.');
  
          let i: number;
          let x = 0;
          const formData = this.ordersForm.value.items;
          for (i = 0; i <= (formData.length) - 1; i++) {
              if ((formData[i].quantityDelivered <= formData[i].quantityRemaining) && (formData[i].quantityDelivered > 0)) {
                this.deliveryData.materials[x].materialID = formData[i].materialID;
                this.deliveryData.materials[x].quantity = formData[i].quantityDelivered;
              }
            }
          
          console.log(this.deliveryData);
          this.http.put('https://' + this.devService.domain + '/api/v1/stock', this.deliveryData).subscribe(
                (resp: Outcome) => {
                  if (resp.statusCode === '200') {
                    alertify.success(resp.message);
  
                   }
                },
                (error: HttpErrorResponse) => {
                  alertify.error(error.status + ' - ' + error.statusText);
                 }
              );
          this.router.navigate(['/admin/orders/list']);
        } else {
          alertify.success('Checking-out stock. You will be notified once complete.');
  
          let i: number;
          let x = 0;
          const formData = this.ordersForm.value.items;
          for (i = 0; i <= (formData.length) - 1; i++) {
              if ((formData[i].quantityIssued <= formData[i].quantityRemaining) && (formData[i].quantityIssued > 0)) {
                this.checkoutData.materials[x].materialID = formData[i].materialID;
                this.checkoutData.materials[x].quantity = formData[i].quantityIssued;
              }
            }
          
          console.log(this.checkoutData);
          this.http.put('https://' + this.devService.domain + '/api/v1/stock', this.checkoutData).subscribe(
                (resp: Outcome) => {
                  if (resp.statusCode === '200') {
                    alertify.success(resp.message);
  
                   }
                },
                (error: HttpErrorResponse) => {
                  alertify.error(error.status + ' - ' + error.statusText);
                 }
              );
          this.router.navigate(['/admin/orders/filter']);
        }
      }
    }
    
}
