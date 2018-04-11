import { Order } from '../../models/Order.model';
import { Item } from '../../models/item.model';
import { ItemBreakdown } from '../../models/itemBreakdown.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { OrderItem } from '../../models/orderItem.model';
import { ProcessOrder } from '../../models/processOrder.model';
import { OrderApprovalItem } from '../../models/orderApprovalItem.model';
import { OrderList } from '../../models/orderList.model';
import { ProjectOrder } from '../../models/projectOrder.model';
import { Suppliers } from '../../models/suppliers.model';
import { OrdersService } from '../../services/orders.service';
import { SuppliersService } from '../../services/suppliers.service';
const alertify = require('alertify.js');
@Component({
  selector: 'app-processorders',
  templateUrl: './processOrders.component.html',
  styleUrls: ['./processOrders.component.css']
})
export class ProcessOrdersComponent implements OnInit {
  ordersForm: FormGroup;
  suppliers: Suppliers = new Suppliers(null);
  orders: OrderList = new OrderList(null, null);
  ordersLoaded = false;
  showDetail = false;
  noOrders = false;
  itemsSelected = 0;
  constructor(
    private ordersService: OrdersService,
    private suppliersService: SuppliersService,
    private http: HttpClient,
    
    ) { }

  ngOnInit() {
   
    this.ordersForm = new FormGroup({
        projects: new FormArray([]),
      });
      console.log(this.ordersForm);
      


    // ORDERS
      this.ordersService.orderListChanged.subscribe(
          (orders: OrderList) => {
              console.log(orders);
              if (orders !== null) {
                this.orders = new OrderList(null, null);
                this.orders = orders;
                this.ordersForm = new FormGroup({
                  projects: new FormArray([]),
                });
                let j: number;
                for (j = 0; j <= (this.orders.projectOrders.length) - 1; j++) {
                  const projectOrder = this.orders.projectOrders[j];
                  this.addProject(projectOrder.project);
                  let l: number;
                  for (l = 0; l <= (projectOrder.materials.length) - 1; l++) {
                    const item = projectOrder.materials[l];
                    this.addItem(j, item.materialID, item.description, item.quantity, item.rate);
                    let p: number;
                    for (p = 0; p <= (item.breakdown.length) - 1; p++) {
                      const breakdown = item.breakdown[p];
                      this.addBreakdown(
                        j,
                        l,
                        breakdown.itemID,
                        breakdown.project,
                        breakdown.township,
                        breakdown.erf,
                        breakdown.privateUseArea,
                        breakdown.building,
                        breakdown.description,
                        breakdown.group,
                        breakdown.category,
                        breakdown.quantity,
                        breakdown.rate,
                        breakdown.contractAllocation
                      );
                     
                    }
                  }
                }
              } else {
                this.noOrders = true;
              }
               
              this.ordersLoaded = true;
            }
        );
      
      this.ordersService.fetchOrders(null, 'UnprocessedOrders');
    // SUPPLIERS
      this.suppliersService.supplierListChanged.subscribe(
          (suppliers: Suppliers) => {
            console.log(suppliers);
              this.suppliers = suppliers;
            }
        );
      this.suppliersService.fetchSuppliers();
  }
  getProjects(form) {
    return form.controls.projects.controls;
  }
  getOrders(form) {
    return form.controls.orders.controls;
  }
  getItems(form) {
    return form.controls.items.controls;
  }
  getBreakdown(form) {
    return form.controls.breakdown.controls;
  }
  addProject(name: string) {
    const control = <FormArray>this.ordersForm.get('projects');
    control.push(this.initProject(name));
  }

  addItem(j: number, materialID: string, description: string, quantity: number, rate: number) {
    const control = (<FormArray>(<FormArray>this.ordersForm.get('projects')).controls[j].get('items'));
    control.push(this.initItem(materialID, description, quantity, rate));
  }
  
  addBreakdown(
    j: number,
    l: number,
    itemID: string,
    project: string,
    township: string,
    erf: string,
    PUA: string,
    building: string,
    description: string,
    group: string,
    category: string,
    quantity: number,
    rate: number,
    contractAllocation: string) {
    const control = (<FormArray>(<FormArray>(<FormArray>this.ordersForm.get('projects')).controls[j].get('items')).controls[l].get('breakdown'));
    control.push(this.initBreakdown(itemID, project, township, erf, PUA, building, description, group, category, quantity, rate, contractAllocation));
  }
  
  initProject(name: string) {
    return new FormGroup({
                            'name': new FormControl(name),
                            'items': new FormArray([])
                        });
  }
  initItem(materialID: string, description: string, quantity: number, rate: number) {
    return new FormGroup({
                                                'supplier': new FormControl('instruction'),
                                                'materialID': new FormControl(materialID),
                                                'description': new FormControl(description),
                                                'quantity': new FormControl(quantity),
                                                'rate': new FormControl(rate),
                                                'breakdown': new FormArray([])
                                            });
  }
  initBreakdown(itemID: string, project: string, township: string, erf: string, PUA: string, building: string, description: string, group: string, category: string, quantity: number, rate: number, contractAllocation: string) {
    return new FormGroup({
                                                'outcome': new FormControl(),
                                                'reason': new FormControl(),
                                                'itemID': new FormControl(itemID),
                                                'project': new FormControl(project),
                                                'township': new FormControl(township),
                                                'erf': new FormControl(erf),
                                                'PUA': new FormControl(PUA),
                                                'building': new FormControl(building),
                                                'description': new FormControl(description),
                                                'group': new FormControl(group),
                                                'category': new FormControl(category),
                                                'quantity': new FormControl(quantity),
                                                'rate': new FormControl(rate),
                                                'contractAllocation': new FormControl(contractAllocation)
                                            });
    }
    showDetailToggle(){
      this.showDetail = !this.showDetail;
    }
    processOrder() {
      this.ordersLoaded = false;
      const formData = this.ordersForm;
      //console.log(formData);
      const processOrder = new ProcessOrder('Process Order', []);
      let i: number;
      for (i = 0; i <= (formData.value.projects.length) - 1; i++) {
          const project = formData.value.projects[i];
         // console.log(project);
          let n: number;
          for (n = 0; n <= (project.items.length) - 1; n++) {
            const item = project.items[n];
            // console.log(item);
              if (item.supplier !== 'instruction') {
              let p: number;
              for (p = 0; p <= (item.breakdown.length) - 1; p++) {
                const breakdown = item.breakdown[p];
               // console.log(breakdown);
                if (breakdown.contractAllocation !== '') {
                  let approval: boolean;
                  if (breakdown.outcome === null) {
                    approval = true;
                    const orderApprovalItem = new OrderApprovalItem(breakdown.itemID, approval, null, item.supplier);
                    processOrder.orderApprovalItems.push(orderApprovalItem);
                  }
                }
              }
            }
          }
        }
      console.log(processOrder);
      this.http.post('https://www.calgrois.co.za/api/v1/orders', processOrder).subscribe(
              (resp: Outcome) => {
                console.log(resp);
                if (resp.statusCode === '200') {
                  alertify.success(resp.message);
                  this.ordersService.fetchOrders(null, 'UnprocessedOrders');
                 }
              },
              (error: HttpErrorResponse) => {
                console.log(error);
                alertify.error(error.status + ' - ' + error.statusText);
                this.ordersLoaded = true;
                  
               }
            );
    }
    selectItem(j, k, l) {
      const outcome = this.ordersForm.value.projects[j].items[k].breakdown[l].outcome;
      if (outcome === true) {
        this.itemsSelected--;
      } else {
        this.itemsSelected++;
      }
      console.log(this.itemsSelected);
    }
    deleteItems() {
      this.ordersLoaded = false;
                  
      const formData = this.ordersForm;
      //console.log(formData);
      const processOrder = new ProcessOrder('Process Order', []);
      let i: number;
      for (i = 0; i <= (formData.value.projects.length) - 1; i++) {
          const project = formData.value.projects[i];
         // console.log(project);
          let n: number;
          for (n = 0; n <= (project.items.length) - 1; n++) {
            const item = project.items[n];
            // console.log(item);
            let p: number;
            for (p = 0; p <= (item.breakdown.length) - 1; p++) {
              const breakdown = item.breakdown[p];
             // console.log(breakdown);
              if (breakdown.contractAllocation !== '') {
                let approval: boolean;
                if (breakdown.outcome === true) {
                  approval = false;
                  const orderApprovalItem = new OrderApprovalItem(breakdown.itemID, approval, null, item.supplier);
                  processOrder.orderApprovalItems.push(orderApprovalItem);
                }
              }
            }
          }
        }
      console.log(processOrder);
      this.http.post('https://www.calgrois.co.za/api/v1/orders', processOrder).subscribe(
              (resp: Outcome) => {
                if (resp.statusCode === '200') {
                  alertify.success(resp.message);
                  this.ordersService.fetchOrders(null, 'UnprocessedOrders');
                 }
              },
              (error: HttpErrorResponse) => {
                alertify.error(error.status + ' - ' + error.statusText);
                this.ordersLoaded = true;
                  
               }
            );
    }
 }
      
      //this.orders = new OrderItems('Place Order', [], null);
//      if (!this.ordersForm.valid) {
//        alertify.error('You have specified an amount over the limit. See the field in red.');
//      } else if (this.ordersForm.value.deliveryAddressID === 'instruction') { // Hasn't been set
//        alertify.error('You must specify a delivery address');
//      } else {
//        alertify.success('Placing Order. You will be notified once complete.');
//        let i: number;
//        const formData = this.ordersForm.value.orderItem;
//        for (i = 0; i <= (formData.length) - 1; i++) {
//            if ((formData[i].status) && (formData[i].quantityOrdered <= formData[i].quantityRemaining) && (formData[i].quantityOrdered > 0)) {
//            this.orders.orderItems.push(
//              new OrderItem(
//                formData[i].materialID,
//                null,
//                formData[i].buildingID,
//                formData[i].description,
//                formData[i].group,
//                formData[i].category,
//                formData[i].quantityOrdered,
//                this.ordersForm.value.deliveryAddressID,
//                null));
//          }
//        }
//        console.log(this.orders);
//        this.materialsService.fetchMaterials(this.buildingID, this.materialListType, this.materialID);
//        this.http.post('https://www.calgrois.co.za/api/v1/orders', this.orders).subscribe(
//              (resp: Outcome) => {
//                if (resp.statusCode === '200') {
//                  alertify.success(resp.message);
//
//                 }
//              },
//              (error: HttpErrorResponse) => {
//                alertify.error(error.status + ' - ' + error.statusText);
//               }
//            );
//        this.router.navigate(['/admin/placeOrders/filter']);
//      }
    }
}