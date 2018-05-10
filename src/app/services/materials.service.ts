import { MaterialDetail } from '../models/materialDetail.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class MaterialsService {
  materialListChanged = new EventEmitter<MaterialDetail[]>();
  query = '';

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchMaterials(buildingID, mode, materialID) {
    if (buildingID !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'buildingID=' + buildingID;
    }
    if (mode !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'mode=' + mode;
    }
    if (this.query !== '') {
      this.query += '&limit=500&offset=0';
    }
    if (materialID === null) {
      console.log('https://' + this.devService.domain + '/api/v1/materials/?' + this.query);
      this.http.get<MaterialDetail[]>('https://' + this.devService.domain + '/api/v1/materials/?' + this.query).subscribe(
        resp => {
          this.query = '';
          if (resp) {
            this.materialListChanged.emit(resp);
          } else {
            this.materialListChanged.emit([new MaterialDetail(null, 'None Found', null, null, null, null, null, null, null, null)]);
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    } else {
      console.log('https://' + this.devService.domain + '/api/v1/materials/' + materialID + '/' + this.query);
      this.http.get<MaterialDetail[]>('https://' + this.devService.domain + '/api/v1/materials/' + materialID + '/' + this.query).subscribe(
        resp => {
          this.query = ''
          if (resp) {
            this.materialListChanged.emit(resp);
          } else {
            this.materialListChanged.emit([new MaterialDetail(null, 'None Found', null, null, null, null, null, null, null, null)]);
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    }
  }
}
