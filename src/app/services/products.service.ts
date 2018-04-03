import { ProductDetail } from '../models/productDetail.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ProductsService {
  productListChanged = new EventEmitter<ProductDetail[]>();
  query = '';

  constructor(private http: HttpClient) { }

  fetchProducts(departmentID) {
    if (departmentID !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'departmentID=' + departmentID;
    }
    if (this.query !== '') {
      this.query += '&limit=500&offset=0';
    }
    console.log('https://www.calgrois.co.za/api/v1/products/?' + this.query);
    this.http.get<ProductDetail[]>('https://www.calgrois.co.za/api/v1/products/?' + this.query).subscribe(
      resp => {
        this.query = '';
        if (resp) {
          this.productListChanged.emit(resp);
        } else {
          this.productListChanged.emit([new ProductDetail(null, 'No Products Found', null, null, null)]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
