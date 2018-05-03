import { Component } from '@angular/core';
import { Contractors } from '../../../models/contractors.model';
import { ContractorShort } from '../../../models/contractorShort.model';
import { ContractorsService } from '../../../services/contractors.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Outcome } from '../../../models/outcome.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DevService } from '../../../services/dev.service';

const alertify = require('alertify.js');

@Component({
  selector: 'app-contractorsadd',
  templateUrl: './contractorsAdd.component.html',
  styleUrls: ['./contractorsAdd.component.css']
})
export class ContractorsAddComponent {

  constructor(
    private contractorsService: ContractorsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  contractorSubscription;

  onSave(form: NgForm) {
    const name = form.value.ContractorName;

    if (name === '') {
      alertify.error('Contractor\'s name is required');
    } else {
      alertify.success('Saving contractor.  You will be notified once complete.');

      const contractorAdd = {
        'name': name
      };

      this.contractorSubscription = this.http.post('https://' + this.devService.domain + '/api/v1/contractors', contractorAdd).subscribe(
          (resp: Outcome) => {
            if (resp.statusCode === '200') {
              alertify.success(resp.message);
              this.router.navigate(['/admin/contractors/list']);
            }
          },
          (error: HttpErrorResponse) => {
            alertify.error(error.status + ' - ' + error.statusText);
          }
        );
    }
  }

  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }
}
