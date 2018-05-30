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
  selector: 'app-contractsedit',
  templateUrl: './contractsEdit.component.html',
  styleUrls: ['./contractsEdit.component.css']
})
export class ContractsEditComponent implements OnInit {
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

    onSave(form: NgForm) {
      const financeID = form.value.FinanceID;
      const contractType = form.value.ContractType;
      const buildingID = form.value.BuildingID;

      if (financeID === '') {
          alertify.error('Finance ID is required');
      } else if (contractType === '') {
          alertify.error('Contract Type is required');
      } else if (buildingID === '') {
        alertify.error('Building ID is required');
      } else {
        alertify.success('Updating contract.  You will be notified once complete.');

        const contractsUpdate = {
          contracts: [
            {
              'contractID': this.contractsID,
              'financeID': financeID.toString(),
              'type': contractType,
              'buildingID': buildingID.toString()
            }
          ]
        };

        this.http.put('https://' + this.devService.domain + '/api/v1/contracts', contractsUpdate).subscribe(
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
    }

    ngOnDestroy() {
        this.contractsSubscription.unsubscribe();
    }

}
