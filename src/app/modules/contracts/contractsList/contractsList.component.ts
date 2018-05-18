import { ContractsDetail } from '../../../models/contractsDetail.model';
import { Contracts } from '../../../models/contracts.model';
import { ContractsService } from '../../../services/contracts';
import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractslist',
  templateUrl: './contractsList.component.html',
  styleUrls: ['./contractsList.component.css']
})
export class ContractsListComponent implements OnInit {
// CHECK this !
//  contracts: any;
  contractsForm: FormGroup;

  constructor(
    private contractsService: ContractsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
  ) { }

    defaultContracts: ContractsDetail = new ContractsDetail(null, null, null);
    contracts: contracts = new contracts([this.defaultContracts]);
    contractID = this.contractsService.contractID;
    financeID = this.contractsService.financeID;
    type = this.contractsService.type;


  ngOnInit() {
    this.contractsForm = new FormGroup({
      'contractsRecord': new FormArray([])
    });

    // Contracts
    this.contractsService.contractsListChanged.subscribe(
        (contracts: Contracts) => {
            this.contracts = new Contracts([]);
            this.contracts = Contracts;
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
