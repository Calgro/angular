import { PrivateUseAreaShort } from '../models/privateUseAreaShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class PuaService {
  puaListChanged = new EventEmitter<PrivateUseAreaShort[]>();
  currentPUAID = '';
  constructor(private http: HttpClient) { }

  fetchPUA(erfID) {
    //console.log('PUA Updated');
    this.http.get<PrivateUseAreaShort[]>('https://www.calgrois.co.za/api/v1/privateUseAreas/?erfID=' + erfID).subscribe(
      resp => {
        //console.log(resp);
        if (resp) {
          this.puaListChanged.emit(resp);
        } else {
          this.puaListChanged.emit([new PrivateUseAreaShort('', 'None Found')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  getPUA() {
    return this.currentPUAID;
  }

  setPUA(PUAID) {
    this.currentPUAID = PUAID;
  }
}
