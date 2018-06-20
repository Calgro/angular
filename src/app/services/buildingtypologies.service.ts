import { BuildingTypologiesShort } from '../models/buildingTypologiesShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class BuildingTypologiesService {
  buildingTypologiesListChanged = new EventEmitter<BuildingTypologiesShort>();
  query = '';
  typologyID = '';
  name = '';

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchBuildingTypologies(typologyID, name) {
    if (typologyID !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'typologyID=' + typologyID;
    }
    if (name !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'name=' + name;
    }

    if (typologyID === null) {
      console.log('https://' + this.devService.domain + '/api/v1/buildingTypologies/?' + this.query);
      this.http.get<BuildingTypologiesShort>('https://' + this.devService.domain + '/api/v1/buildingTypologies/?' + this.query).subscribe(
        resp => {
          this.query = '';
          console.log(resp);
          if (resp) {
            this.buildingTypologiesListChanged.emit(resp);
          } else {
            this.buildingTypologiesListChanged.emit(new BuildingTypologiesShort('', ''));
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    } else {
      console.log('https://' + this.devService.domain + '/api/v1/buildingTypologies/' + typologyID + '/' + this.query);
      this.http.get<BuildingTypologiesShort>('https://' + this.devService.domain + '/api/v1/buildingTypologies/' + typologyID + '/' + this.query).subscribe(
        resp => {
          this.query = '';
          console.log(resp);
          if (resp) {
            this.buildingTypologiesListChanged.emit(resp);
          } else {
            this.buildingTypologiesListChanged.emit(new BuildingTypologiesShort('', ''));
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    }
  }
}
