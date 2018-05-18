import { ContractsDetail } from '../../../models/contractsDetail.model';
import { Contracts } from '../../../models/contracts.model';
import { ContractsService } from '../../../services/contracts.service';

import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-contractslist',
  templateUrl: './contractsList.component.html',
  styleUrls: ['./contractsList.component.css']
})
export class ContractsListComponent implements OnInit {
  contractsForm: FormGroup;

  constructor(
    private contractsService: ContractsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
  ) { }

  defaultContracts: ContractsDetail = new ContractsDetail(null, null, null);
  contracts: Contracts = new Contracts([this.defaultContracts]);
  contractID = this.contractsService.contractID;
  financeID = this.contractsService.financeID;
  type = this.contractsService.type;


  ngOnInit() {
    this.contractsForm = new FormGroup({
      'contractsRecord': new FormArray([])
    });

    // CONTRACTS
    this.contractsService.contractsListChanged.subscribe(
        (contracts: Contracts) => {
            this.contracts = new Contracts([]);
            this.contracts = contracts;
            this.contractsForm = new FormGroup({
                'contractsRecord': new FormArray([])
            });
            let i: number;
            for (i = 0; i <= (this.contracts.contracts.length) - 1; i++) {
                const controlGroup = new FormGroup({
                                                      'status': new FormControl(false),
                                                      'contractID': new FormControl(this.contracts.contracts[i].contractID),
                                                      'financeID': new FormControl(this.contracts.contracts[i].financeID),
                                                      'type': new FormControl(this.contracts.contracts[i].type)
                                                  });
                (<FormArray>this.contractsForm.get('contractsRecord')).push(controlGroup);
            }
          }
      );

    this.contractsService.fetchContracts(this.contractID, this.financeID, this.type);
  }

}
