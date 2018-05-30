import { ContractsDetail } from '../../../models/contractsDetail.model';
import { Outcome } from '../../../models/outcome.model';
import { ContractsService } from '../../../services/contracts.service';
import { DevService } from '../../../services/dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
const alertify = require('alertify.js');

@Component({
  selector: 'app-contractsremove',
  templateUrl: './contractsRemove.component.html',
  styleUrls: ['./contractsRemove.component.css']
})
export class ContractsRemoveComponent implements OnInit {
  contracts: ContractsDetail = new ContractsDetail(null, null, null);
  contractsLoaded = false;
  noContracts = false;

  constructor(
    private contractsService: ContractsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  contractsSubscription;
  contractsID = this.contractsService.contractID;

  ngOnInit() {
    this.contractsSubscription = this.contractsService.contractsListChanged.subscribe(
      (contracts: ContractsDetail) => {
        if (contracts !== null) {
            this.contracts = contracts;
        } else {
            this.noContracts = true;
        }
        this.contractsLoaded = true;
      }
    );
    this.contractsService.fetchContracts(this.contractsID, null, null);
  }

  onDelete(form: NgForm) {
    const contractsID = this.contracts.contractID;

    alertify.success('Deleting contract.  You will be notified once complete.');

    this.contractsSubscription = this.http.delete('https://' + this.devService.domain + '/api/v1/contracts/' + contractsID).subscribe(
      (resp: Outcome) => {
        if (resp.statusCode === '200') {
            alertify.success(resp.message);
            this.router.navigate(['/admin/contracts/list']);
        }
      },
      (error: HttpErrorResponse) => {
       alertify.error(error.status + ' - ' + error.statusText);
      }
    );
  }

  ngOnDestroy() {
    this.contractsSubscription.unsubscribe();
  }

}
