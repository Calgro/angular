import { PrivateUseAreaShort } from '../models/privateUseAreaShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class PuaService {
  puaListChanged = new EventEmitter<PrivateUseAreaShort[]>();
  currentPUAID = '';
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchPUA(erfID) {
    //console.log('PUA Updated');
    this.http.get<PrivateUseAreaShort[]>('https://' + this.devService.domain + '/api/v1/privateUseAreas/?erfID=' + erfID).subscribe(
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
