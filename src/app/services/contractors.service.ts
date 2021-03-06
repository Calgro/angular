import { ContractorShort } from '../models/contractorShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ContractorsService {
  contractorListChanged = new EventEmitter<ContractorShort[]>();
  query = '?';

  constructor(private http: HttpClient) { }

  fetchContractors(projectID, townshipID, erfID, PUAID, buildingID) {
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
    if (buildingID !== null) {
      if (this.query !== '?') {
        this.query += '&';
      }
      this.query += 'buildingID=' + buildingID;
    }
    console.log('https://www.calgrois.co.za/api/v1/contractors/' + this.query);
    this.http.get<ContractorShort[]>('https://www.calgrois.co.za/api/v1/contractors/' + this.query).subscribe(
      resp => {
        console.log(resp);
        if (resp) {
          this.contractorListChanged.emit(resp);
        } else {
          this.contractorListChanged.emit([new ContractorShort('', 'None Found')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
