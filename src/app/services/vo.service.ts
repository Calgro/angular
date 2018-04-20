import { VariationOrdersShort } from '../models/variationOrdersShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class VoService {
  VOListChanged = new EventEmitter<VariationOrdersShort[]>();
  query = '?';
  currentVariationOrdersID = '';
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchVariationOrders(projectID, townshipID, erfID, PUAID, type) {
    if (projectID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'projectID=' + projectID;
    }
    if (townshipID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'townshipID=' + townshipID;
    }
    if (erfID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'erfID=' + erfID;
    }
    if (PUAID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'PUAID=' + PUAID;
    }
    if (type !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'type=' + type;
    }
    console.log('https://' + this.devService.domain + '/api/v1/variationOrders/' + this.query);
    this.http.get<VariationOrdersShort[]>('https://' + this.devService.domain + '/api/v1/variationOrders/' + this.query).subscribe(
      resp => {
        this.query = '?';
        console.log(resp);
        if (resp) {
          this.VOListChanged.emit(resp);
        } else {
          this.VOListChanged.emit(null);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  getBuilding() {
    return this.currentVariationOrdersID;
  }

  setBuilding(buildingID) {
    this.currentVariationOrdersID = buildingID;
  }
}

