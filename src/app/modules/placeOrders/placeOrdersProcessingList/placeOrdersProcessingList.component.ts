import { AuthService } from '../../../auth/auth.service';
import { DeliveryAddressDetail } from '../../../models/deliveryAddressDetail.model';
import { DeliveryAddresses } from '../../../models/deliveryAddresses.model';
import { MaterialDetail } from '../../../models/materialDetail.model';
import { Materials } from '../../../models/materials.model';
import { OrderItem } from '../../../models/orderItem.model';
import { OrderItems } from '../../../models/orderItems.model';
import { Outcome } from '../../../models/outcome.model';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { AddressService } from '../../../services/address.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');

@Component({
  selector: 'app-placeordersprocessinglist',
  templateUrl: './placeordersprocessinglist.component.html',
  styleUrls: ['./placeordersprocessinglist.component.css']
})
export class PlaceOrdersProcessingListComponent implements OnInit {
  ordersForm: FormGroup;
  orders: OrderItems = new OrderItems(null, [] ,null);

  constructor(
    private materialsService: MaterialsService,
    private filterService: FilterService,
    private addressService: AddressService,
    private http: HttpClient,
    private router: Router
    ) { }

    defaultMaterial: MaterialDetail = new MaterialDetail('', 'Select a Building First', null, null, null, null, null, null);
    materials: Materials = new Materials([this.defaultMaterial]);
    defaultAddress: DeliveryAddressDetail = new DeliveryAddressDetail(null, null, null);
    addresses: DeliveryAddresses = new DeliveryAddresses([this.defaultAddress]);
    checked = '';
    projectID = this.filterService.projectID;
    townshipID = this.filterService.townshipID;
    erfID = this.filterService.erfID;
    PUAID = this.filterService.PUAID;
    buildingID = this.filterService.buildingID;
    materialListType = this.filterService.materialListType;
    materialID = this.filterService.materialID;
    departmentID = this.filterService.departmentID;

    ngOnInit() {
      this.ordersForm = new FormGroup({
                  'deliveryAddressID': new FormControl('instruction'),
                  'orderItem': new FormArray([])
              });


      // MATERIALS
      this.materialsService.materialListChanged.subscribe(
          (materials: Materials) => {
              this.materials = new Materials([]);
              this.materials = materials;
              this.ordersForm = new FormGroup({
                  'deliveryAddressID': new FormControl('instruction'),
                  'orderItem': new FormArray([])
              });
              let i: number;
              for (i = 0; i <= (this.materials.materials.length) - 1; i++) {
                  const controlGroup = new FormGroup({
                                                        'status': new FormControl(false),
                                                        'materialID': new FormControl(this.materials.materials[i].materialID),
                                                        'buildingID': new FormControl(this.materials.materials[i].buildingID),
                                                        'quantityAllowed': new FormControl(this.materials.materials[i].quantityAllowed),
                                                        'quantityOrdered': new FormControl({value: this.materials.materials[i].quantityAllowed, disabled: true}, [Validators.max(this.materials.materials[i].quantityAllowed),Validators.min(0)]),
                                                        'quantityRemaining': new FormControl(this.materials.materials[i].quantityRemaining),
                                                        'description': new FormControl(this.materials.materials[i].description),
                                                        'group': new FormControl(this.materials.materials[i].group),
                                                        'category': new FormControl(this.materials.materials[i].category)
                                                    });
                  (<FormArray>this.ordersForm.get('orderItem')).push(controlGroup);
              }
            }
        );
      this.materialsService.fetchMaterials(this.buildingID, this.materialListType, this.materialID);

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
      this.orders = new OrderItems('Place Order', [], null);
      if (!this.ordersForm.valid) {
        alertify.error('You have specified an amount over the limit. See the field in red.');
      } else if (this.ordersForm.value.deliveryAddressID === 'instruction') { // Hasn't been set
        alertify.error('You must specify a delivery address');
      } else {
        alertify.success('Placing Order. You will be notified once complete.');
        let i: number;
        const formData = this.ordersForm.value.orderItem;
        for (i = 0; i <= (formData.length) - 1; i++) {
            if ((formData[i].status) && (formData[i].quantityOrdered <= formData[i].quantityRemaining) && (formData[i].quantityOrdered > 0)) {
            this.orders.orderItems.push(
              new OrderItem(
                formData[i].materialID,
                null,
                formData[i].buildingID,
                formData[i].description,
                formData[i].group,
                formData[i].category,
                formData[i].quantityOrdered,
                this.ordersForm.value.deliveryAddressID,
                null));
          }
        }
        console.log(this.orders);
        this.materialsService.fetchMaterials(this.buildingID, this.materialListType, this.materialID);
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
