import { BuildingShort } from '../models/buildingShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class BuildingsService {
  buildingListChanged = new EventEmitter<BuildingShort[]>();
  query = '?';
  currentBuildingID = '';
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchBuildings(projectID, townshipID, erfID, PUAID, zoningID, contractorID, orderGroupID, limit, offset) {
    if (orderGroupID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'orderGroupID=' + orderGroupID;
    }
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
    if (zoningID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'zoningID=' + zoningID;
    }
    if (contractorID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'contractorID=' + contractorID;
    }
    if ((limit !== null) && (offset !== null)) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'limit=' + limit;
      this.query += '&offset=' + offset;
    }
    console.log('https://' + this.devService.domain + '/api/v1/buildings/' + this.query);
    this.http.get<BuildingShort[]>('https://' + this.devService.domain + '/api/v1/buildings/' + this.query).subscribe(
      resp => {
        this.query = '?';
        console.log(resp);
        if (resp) {
          this.buildingListChanged.emit(resp);
        } else {
          this.buildingListChanged.emit([new BuildingShort('', 'None Found', '', '', '', '')]);
        }
      },
      (error: HttpErrorResponse) => {
      //  alertify.error(error.status + ' - ' + error.statusText);
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
