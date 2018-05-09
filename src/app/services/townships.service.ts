import { TownshipShort } from '../models/townshipShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class TownshipsService {
  townshipListChanged = new EventEmitter<TownshipShort[]>();
  emptyTownship: TownshipShort = new TownshipShort("","None Found");
  currentTownshipID = '';       
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchTownships(projectID) {
    //console.log('Triggered Township');
    //console.log('projectID: '+projectID);
    console.log('https://' + this.devService.domain + '/api/v1/townships/?projectID=' + projectID);
    this.http.get<TownshipShort[]>('https://' + this.devService.domain + '/api/v1/townships/?projectID=' + projectID).subscribe(
      resp => {
       
        console.log(resp);
        if (resp) {
          this.townshipListChanged.emit(resp);
        } else {
          this.townshipListChanged.emit([this.emptyTownship]);
        }

      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  
   getTownship() {
    return this.currentTownshipID;
  }
  
  setTownship(townshipID) {
    this.currentTownshipID = townshipID;
  }
}
