import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/authguard.service';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { MenusService } from './services/menus.service';
import { PlaceOrdersFilterComponent } from './modules/placeOrders/placeOrdersFilter/placeOrdersFilter.component';
import { PlaceOrdersProcessingListComponent } from './modules/placeOrders/placeOrdersProcessingList/placeOrdersProcessingList.component';
import { AddressService } from './services/address.service';
import { BuildingsService } from './services/buildings.service';
import { ContractorsService } from './services/contractors.service';
import { DepartmentsService } from './services/departments.service';
import { ErvenService } from './services/erven.service';
import { FilterService } from './services/filter.service';
import { MaterialsService } from './services/materials.service';
import { ProjectsService } from './services/projects.service';
import { PuaService } from './services/pua.service';
import { TownplanningService } from './services/townplanning.service';
import { TownshipsService } from './services/townships.service';
import { ProcessingListToolbarComponent } from './toolbars/processingListToolbar/processingListToolbar.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { PlaceOrdersDepartmentProcessingListComponent } from './modules/placeOrders/placeOrdersDepartmentProcessingList/placeOrdersDepartmentProcessingList.component';
import { ProductsService } from './services/products.service';
import { ProcessOrdersComponent } from './modules/processOrders/processOrders.component';
import { OrdersService } from './services/orders.service';
import { SuppliersService } from './services/suppliers.service';
import { OrdersDashboardComponent } from './modules/orders/ordersdashboard/ordersDashboard.component';
import { OrdersListComponent } from './modules/orders/ordersList/ordersList.component';
import { OrderDetailComponent } from './modules/orders/orderDetail/orderDetail.component';
import { OrdersSupplierFormComponent } from './modules/orders/ordersSupplierForm/ordersSupplierForm.component';
import { DevService } from './services/dev.service';
import { ChartsModule } from 'ng2-charts';
import { OrdersDeliveryFormComponent } from './modules/orders/ordersDeliveryForm/ordersDeliveryForm.component';
import { OrdersFilterComponent } from './modules/orders/ordersFilter/ordersFilter.component';
import { TrackingService } from './services/tracking.service';
import { StockComponent } from './modules/stock/stock.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MaterialListComponent } from './modules/materialList/materialList/materialList.component';
import { MaterialFilterComponent } from './modules/materialList/materialFilter/materialFilter.component';
import { MaterialUploadComponent } from './modules/materialList/materialUpload/materialUpload.component';
import { MaterialListUploadFilterComponent } from './modules/materialList/materialListUploadFilter/materialListUploadFilter.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://www.calgrois.com/api/v1/upload',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


const appRoutes: Routes = [
 // { path: '', component: LoginComponent},
  //{ path: 'login', component: LoginComponent},
//  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children :[
//    { path: 'placeOrdersFilter', component: PlaceOrdersFilterComponent},
//    { path: 'placeOrdersProcessingList', component: PlaceOrdersProcessingListComponent}
//  ] },
  { path: 'admin', children : [
    { path: 'placeOrders', children : [
          { path: 'filter', component: PlaceOrdersFilterComponent},
          { path: 'processingList', component: PlaceOrdersProcessingListComponent},
          { path: 'departmentProcessingList', component: PlaceOrdersDepartmentProcessingListComponent}
    ]},
    { path: 'processOrders', component: ProcessOrdersComponent},
    { path: 'orders', children : [
          { path: 'dashboard', component: OrdersDashboardComponent},
          { path: 'list', component: OrdersListComponent},
          { path: 'detail', component: OrderDetailComponent},
          { path: 'editSupplier', component: OrdersSupplierFormComponent},
          { path: 'editDelivery', component: OrdersDeliveryFormComponent},
          { path: 'filter', component: OrdersFilterComponent},
          { path: 'stock', component: StockComponent},
    ]},
    { path: 'materialList', children : [
          { path: 'list', component: MaterialListComponent},
          { path: 'filter', component: MaterialFilterComponent},
          { path: 'upload', component: MaterialUploadComponent},
          { path: 'uploadFilter', component: MaterialListUploadFilterComponent}
    ]},
  ] },

];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    AdminComponent,
    DropdownDirective,
    PlaceOrdersFilterComponent,
    PlaceOrdersProcessingListComponent,
    ProcessingListToolbarComponent,
    PlaceOrdersDepartmentProcessingListComponent,
    ProcessOrdersComponent,
    OrdersDashboardComponent,
    OrdersListComponent,
    OrderDetailComponent,
    OrdersSupplierFormComponent,
    OrdersDeliveryFormComponent,
    OrdersFilterComponent,
    StockComponent,
    MaterialListComponent,
    MaterialFilterComponent,
    MaterialUploadComponent,
    MaterialListUploadFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularMultiSelectModule,
    ReactiveFormsModule,
    ChartsModule,
    DropzoneModule,
    SignaturePadModule,
  ],
  providers: [
    AuthGuardService,
    HttpModule,
    HttpClientModule,
    AuthService,
    ProjectsService,
    TownshipsService,
    ErvenService,
    PuaService,
    BuildingsService,
    TownplanningService,
    ContractorsService, ,
    MaterialsService,
    DepartmentsService,
    FilterService,
    MenusService,
    AddressService,
    ProductsService,
    OrdersService,
    SuppliersService,
    DevService,
    TrackingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService: AuthService) { }
 }
