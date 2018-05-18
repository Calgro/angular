import { ContractsDetail } from '../models/contractsDetail.model';
// import { Contracts } from '../models/contracts.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ContractsService {
  contractsListChanged = new EventEmitter<ContractsDetail[]>();
  query = '';
  contractID = '';
  financeID = '';
  type = '';

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchContracts(contractID, financeID, type) {
    if (financeID !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'financeID=' + financeID;
    }
    if (type !== null) {
      if (this.query !== '') {
        this.query += '&';
      }
      this.query += 'type=' + type;
    }
    if (this.query !== '') {
      this.query += '&limit=500&offset=0';
    }
    if (contractID === null) {
      console.log('https://' + this.devService.domain + '/api/v1/contracts/?' + this.query);
      this.http.get<ContractsDetail[]>('https://' + this.devService.domain + '/api/v1/contracts/?' + this.query).subscribe(
        resp => {
          this.query = '';
          if (resp) {
            this.contractsListChanged.emit(resp);
          } else {
            this.contractsListChanged.emit([new ContractsDetail(null, null, null)]);
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    } else {
      console.log('https://' + this.devService.domain + '/api/v1/contracts/' + contractID + '/' + this.query);
      this.http.get<ContractsDetail[]>('https://' + this.devService.domain + '/api/v1/contracts/' + contractID + '/' + this.query).subscribe(
        resp => {
          this.query = ''
          if (resp) {
            this.contractsListChanged.emit(resp);
          } else {
            this.contractsListChanged.emit([new ContractsDetail(null, null, null)]);
          }
        },
        (error: HttpErrorResponse) => {
          alertify.error(error.status + ' - ' + error.statusText);
         }
      );
    }
  }
}
