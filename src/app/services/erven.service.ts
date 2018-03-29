import { ErfShort } from '../models/erfShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ErvenService {
  erfListChanged = new EventEmitter<ErfShort[]>();
  currentErfID = '';
  constructor(private http: HttpClient) { }

  fetchErven(townshipID) {
    this.http.get<ErfShort[]>('https://www.calgrois.co.za/api/v1/erven/?townshipID=' + townshipID).subscribe(
      resp => {
        if (resp) {
          this.erfListChanged.emit(resp);
        } else {
          this.erfListChanged.emit([new ErfShort('', 'None Found', '')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  getErf() {
    return this.currentErfID;
  }

  setErf(erfID) {
    this.currentErfID = erfID;
  }
}
