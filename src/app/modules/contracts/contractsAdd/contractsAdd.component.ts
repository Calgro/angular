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
  selector: 'app-contractsadd',
  templateUrl: './contractsAdd.component.html',
  styleUrls: ['./contractsAdd.component.css']
})
export class ContractsAddComponent {

  constructor(
    private contractsService: ContractsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  contractsSubscription;

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
      alertify.success('Saving contract.  You will be notified once complete.');

      const contractsAdd = {
        'financeID': financeID.toString(),
        'type': contractType,
        'buildingID': buildingID.toString()
      };

      this.contractsSubscription = this.http.post('https://' + this.devService.domain + '/api/v1/contracts', contractsAdd).subscribe(
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
