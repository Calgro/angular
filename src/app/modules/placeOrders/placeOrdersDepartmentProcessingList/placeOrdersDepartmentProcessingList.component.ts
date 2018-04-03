import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { ProductsService } from '../../../services/products.service';
import { AddressService } from '../../../services/address.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Outcome } from '../../../models/outcome.model';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { OrderItem } from '../../../models/orderItem.model';
import { OrderItems } from '../../../models/orderItems.model';
import { DeliveryAddressDetail } from '../../../models/deliveryAddressDetail.model';
import { DeliveryAddresses } from '../../../models/deliveryAddresses.model';
import { ProductDetail } from '../../../models/productDetail.model';
import { Products } from '../../../models/products.model';
import { Router } from '@angular/router';

const alertify = require('alertify.js');
@Component({
  selector: 'app-placeordersdepartmentprocessinglist',
  templateUrl: './placeOrdersDepartmentProcessingList.component.html',
  styleUrls: ['./placeOrdersDepartmentProcessingList.component.css']
})
export class PlaceOrdersDepartmentProcessingListComponent implements OnInit {
  ordersForm: FormGroup;
  orders: OrderItems = new OrderItems(null, []);
  
  constructor(
    private productsService: ProductsService,
    private filterService: FilterService,
    private addressService: AddressService,
    private http: HttpClient,
    private router: Router
    ) { }

  products: Products = new Products([]);
  addresses: DeliveryAddresses = new DeliveryAddresses([]);
  checked = '';
  departmentID = this.filterService.departmentID;
  
  ngOnInit() {
    this.ordersForm = new FormGroup({
                  'deliveryAddressID': new FormControl('instruction'),
                  'orderItem': new FormArray([])
              });


      // PRODUCTS
      this.productsService.productListChanged.subscribe(
          (products: Products) => {
              this.products = new Products([]);
              this.products = products;
              this.ordersForm = new FormGroup({
                  'deliveryAddressID': new FormControl('instruction'),
                  'orderItem': new FormArray([])
              });
              let i: number;
              for (i = 0; i <= (this.products.products.length) - 1; i++) {
                  const controlGroup = new FormGroup({
                                                        'status': new FormControl(false),
                                                        'productID': new FormControl(this.products.products[i].productID),
                                                        'departmentID': new FormControl(this.products.products[i].departmentID),
                                                        'quantityOrdered': new FormControl({value: 0, disabled: true}, [Validators.min(0)]),
                                                        'description': new FormControl(this.products.products[i].description),
                                                        'group': new FormControl(this.products.products[i].group),
                                                        'category': new FormControl(this.products.products[i].category)
                                                    });
                  (<FormArray>this.ordersForm.get('orderItem')).push(controlGroup);
              }
            }
        );
      this.productsService.fetchProducts(this.departmentID);

      // ADDRESSES
      this.addressService.deliveryAddressListChanged.subscribe(
          (addresses: DeliveryAddresses) => {
              this.addresses = addresses;
            }
        );
      this.addressService.fetchDeliveryAddresses();
  }

   // CHECK ALL BOXES
    checkToggle() {
      const formData = this.ordersForm.value.orderItem;
      let i: number;
      if (this.checked === '') {
        this.checked = 'checked';
        for (i = 0; i <= (formData.length) - 1; i++) {
          const fArray = <FormArray>this.ordersForm.controls.orderItem;
          const fGroup = <FormGroup>fArray.controls[i];
          fGroup.controls.quantityOrdered.enable();
        }
      } else {
        this.checked = '';
        for (i = 0; i <= (formData.length) - 1; i++) {
          const fArray = <FormArray>this.ordersForm.controls.orderItem;
          const fGroup = <FormGroup>fArray.controls[i];
          fGroup.controls.quantityOrdered.disable();
        }
      }
    }

    onOrderCheck(index) {
      const fArray = <FormArray>this.ordersForm.controls.orderItem;
      const fGroup = <FormGroup>fArray.controls[index];
      console.log(fGroup.controls.quantityOrdered.disabled);
      if (fGroup.controls.quantityOrdered.disabled) {
        fGroup.controls.quantityOrdered.enable();
      } else {
        fGroup.controls.quantityOrdered.disable();
      }

    }
    placeOrder() {
      this.orders = new OrderItems('Place Order', []);
      if (!this.ordersForm.valid) {
        alertify.error('You have specified a negative amount. See the field in red.');
      } else if (this.ordersForm.value.deliveryAddress === 'instruction') { // Hasn't been set
        alertify.error('You must specify a delivery address');
      } else {
        alertify.success('Placing Order. You will be notified once complete.');
        let i: number;
        const formData = this.ordersForm.value.orderItem;
        for (i = 0; i <= (formData.length) - 1; i++) {
            if ((formData[i].status) && (formData[i].quantityOrdered > 0)) {
            this.orders.orderItems.push(
              new OrderItem(
                null,
                formData[i].productID,
                null,
                formData[i].description,
                formData[i].group,
                formData[i].category,
                formData[i].quantityOrdered,
                this.ordersForm.value.deliveryAddressID,
                formData[i].departmentID));
          }
        }
        console.log(this.orders);
        this.productsService.fetchProducts(this.departmentID);
        this.http.post('https://www.calgrois.co.za/api/v1/orders', this.orders).subscribe(
              (resp: Outcome) => {
                if (resp.statusCode === '200') {
                  alertify.success(resp.message);
               }
              },
              (error: HttpErrorResponse) => {
                alertify.error(error.status + ' - ' + error.statusText);
               }
            );
        this.router.navigate(['/admin/placeOrders/filter']);
      }
    }
}
