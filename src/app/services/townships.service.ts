import { TownshipShort } from '../models/townshipShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class TownshipsService {
  townshipListChanged = new EventEmitter<TownshipShort[]>();
  emptyTownship: TownshipShort = new TownshipShort("","None Found");
  currentTownshipID = '';       
  constructor(private http: HttpClient) { }

  fetchTownships(projectID) {
    //console.log('Triggered Township');
    //console.log('projectID: '+projectID);
    this.http.get<TownshipShort[]>('https://www.calgrois.co.za/api/v1/townships/?projectID=' + projectID).subscribe(
      resp => {
       /// 
      //  console.log(resp);
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
