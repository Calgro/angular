import { ZoningShort } from '../models/zoningShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class TownplanningService {
  zoningListChanged = new EventEmitter<ZoningShort[]>();
  
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchZonings(townshipID) {
    this.http.get<ZoningShort[]>('https://' + this.devService.domain + '/api/v1/townPlanningRights/?townshipID=' + townshipID).subscribe(
      resp => {
        console.log(resp);
        if (resp) {
          this.zoningListChanged.emit(resp);
        } else {
          this.zoningListChanged.emit([new ZoningShort('', 'None Found')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
