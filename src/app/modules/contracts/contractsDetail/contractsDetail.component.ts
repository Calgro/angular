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
  defaultContracts: ContractsDetail = new ContractsDetail(null, null, null);
  contracts: Contracts = new Contracts([this.defaultContracts]);
  contractsLoaded = false;
  noContracts = false;

  constructor(
    private contractsService: ContractsService,
    private router: Router,
  ) { }

  contractorSubscription;
  contractID = this.contractsService.contractID;

  ngOnInit() {
    // Load the details of a specific contract
    this.contractorSubscription = this.contractsService.contractsListChanged.subscribe(
        (contracts: Contracts) => {
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

  editContract() {
//    this.router.navigate(['/admin/orders/editSupplier']);
  }
  
  deleteContract() {
//    this.router.navigate(['/admin/orders/editDelivery']);
  }  

}

