import { ContractorShort } from '../models/contractorShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ContractorsService {
  contractorListChanged = new EventEmitter<ContractorShort[]>();
  contractorDetailLoader = new EventEmitter<ContractorShort[]>();
  query = '?';
  contractorID = '3';
  name = 'Hannes Venter Bouers';

  constructor(private http: HttpClient, private devService: DevService) { }

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
    console.log('https://' + this.devService.domain + '/api/v1/contractors/' + this.query);
    this.http.get<ContractorShort[]>('https://' + this.devService.domain + '/api/v1/contractors/' + this.query).subscribe(
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

    fetchContractor(contractorID) {
    console.log('https://' + this.devService.domain + '/api/v1/contractors/' + contractorID);
    this.http.get<ContractorShort[]>('https://' + this.devService.domain + '/api/v1/contractors/' + contractorID).subscribe(
      resp => {
        console.log(resp);
        if (resp) {
          this.contractorDetailLoader.emit(resp);
        } else {
          this.contractorDetailLoader.emit([new ContractorShort('', 'None Found')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
