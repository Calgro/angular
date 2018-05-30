import { Contracts } from '../../../models/contracts.model';
import { ContractsDetail } from '../../../models/contractsDetail.model';
import { ContractsService } from '../../../services/contracts.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contractsdetail',
  templateUrl: './contractsDetail.component.html',
  styleUrls: ['./contractsDetail.component.css']
})
export class ContractsDetailComponent implements OnInit {
  contracts: ContractsDetail;
  contractsLoaded = false;
  noContracts = false;

  constructor(
    private contractsService: ContractsService,
    private router: Router,
  ) { }

  contractsSubscription;
  contractID = this.contractsService.contractID;

  ngOnInit() {
    // Load the details of a specific contract
    this.contractsSubscription = this.contractsService.contractsListChanged.subscribe(
        (contracts: ContractsDetail) => {
            console.log(contracts);
            if (contracts !== null) {
              this.contracts = contracts;
            } else {
              this.noContracts = true;
            }
            this.contractsLoaded = true;
         }
      );
    this.contractsService.fetchContracts(this.contractID, null, null);
  }

  contractsEdit() {
    this.router.navigate(['/admin/contracts/edit']);
  }

  contractsDelete() {
    this.router.navigate(['/admin/contracts/remove']);
  }

  ngOnDestroy() {
    this.contractsSubscription.unsubscribe();
  }

}

