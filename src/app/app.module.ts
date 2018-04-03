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

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
//  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children :[
//    { path: 'placeOrdersFilter', component: PlaceOrdersFilterComponent},
//    { path: 'placeOrdersProcessingList', component: PlaceOrdersProcessingListComponent}
//  ] },
  { path: 'admin', component: AdminComponent, children : [
    { path: 'placeOrders', children : [
      { path: 'filter', component: PlaceOrdersFilterComponent},
      { path: 'processingList', component: PlaceOrdersProcessingListComponent},
      { path: 'departmentProcessingList', component: PlaceOrdersDepartmentProcessingListComponent}
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
    PlaceOrdersDepartmentProcessingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularMultiSelectModule,
    ReactiveFormsModule
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
   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
