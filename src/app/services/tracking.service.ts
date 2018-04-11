import { UserShort } from '../models/userShort.model';
import { Users } from '../models/users.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class TrackingService {
  placedByListChanged = new EventEmitter<Users>();

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchPlacedBy() {
    this.http.get<Users>('https://' + this.devService.domain + '/api/v1/orders/?mode=placedBy').subscribe(
      resp => {
        if (resp) {
          this.placedByListChanged.emit(resp);
        } else {
          this.placedByListChanged.emit(null);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
