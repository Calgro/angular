import { BuildingShort } from '../models/buildingShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class BuildingsService {
  buildingListChanged = new EventEmitter<BuildingShort[]>();
  query = '?';
  currentBuildingID = '';
  constructor(private http: HttpClient) { }

  fetchBuildings(erfID, PUAID) {
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
    this.http.get<BuildingShort[]>('https://www.calgrois.co.za/api/v1/buildings/' + this.query).subscribe(
      resp => {
        this.query = '?';
        console.log(resp);
        if (resp) {
          this.buildingListChanged.emit(resp);
        } else {
          this.buildingListChanged.emit([new BuildingShort('', 'None Found', '', '', '')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  getBuilding() {
    return this.currentBuildingID;
  }

  setBuilding(buildingID) {
    this.currentBuildingID = buildingID;
  }
}
