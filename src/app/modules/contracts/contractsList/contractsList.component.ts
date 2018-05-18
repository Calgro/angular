import { ContractsDetail } from '../../../models/contractsDetail.model';
import { Contracts } from '../../../models/contracts.model';
import { ContractsService } from '../../../services/contracts.service';

import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-contractslist',
  templateUrl: './contractsList.component.html',
  styleUrls: ['./contractsList.component.css']
})
export class ContractsListComponent implements OnInit {

  constructor(
    private contractsService: ContractsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
  ) { }

  defaultContracts: ContractsDetail = new ContractsDetail(null, null, null);
  contracts: Contracts = new Contracts([this.defaultContracts]);
  contractID = null;
  financeID = null;
  contractType = null;
  contractsSubscription;
  contractsLoaded = false;
  noContracts = false;

  ngOnInit() {

    // CONTRACTS
    this.contractsSubscription = this.contractsService.contractsListChanged.subscribe(
        (contracts: Contracts) => {
          if (contracts !== null) {
            this.contracts = contracts;
          } else {
            this.noContracts = true;
          }
          this.contractsLoaded = true;
       }
      );

    this.contractsService.fetchContracts(this.contractID, this.financeID, this.contractType);
  }

  loadFilter() {

  }
}
