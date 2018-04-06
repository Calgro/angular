import { Suppliers } from '../models/suppliers.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class SuppliersService {
  supplierListChanged = new EventEmitter<Suppliers>();
  query = '';

  constructor(private http: HttpClient) { }

  fetchSuppliers() {
    console.log('https://www.calgrois.co.za/api/v1/suppliers');
      this.http.get<Suppliers>('https://www.calgrois.co.za/api/v1/suppliers').subscribe(
        resp => {
          this.query = '';
          if (resp) {
            this.supplierListChanged.emit(resp);
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
  }

}
