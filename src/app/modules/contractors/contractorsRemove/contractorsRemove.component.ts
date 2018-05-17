import { ContractorShort } from '../../../models/contractorShort.model';
import { Outcome } from '../../../models/outcome.model';
import { ContractorsService } from '../../../services/contractors.service';
import { DevService } from '../../../services/dev.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-contractorsremove',
  templateUrl: './contractorsRemove.component.html',
  styleUrls: ['./contractorsRemove.component.css']
})
export class ContractorsRemoveComponent implements OnInit {
  contractor: ContractorShort = new ContractorShort(null, null);
  contractorLoaded = false;
  noContractor = false;

  constructor(
    private contractorsService: ContractorsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  contractorSubscription;
  contractorID = this.contractorsService.contractorID;

  ngOnInit() {
    this.contractorSubscription = this.contractorsService.contractorDetailLoader.subscribe(
      (contractor: ContractorShort) => {
        if (contractor !== null) {
            this.contractor = contractor;
        } else {
            this.noContractor = true;
        }
        this.contractorLoaded = true;
      }
    );

    this.contractorsService.fetchContractor(this.contractorID);
  }

  onDelete(form: NgForm) {
    const contractorID = this.contractor.contractorID;

    alertify.success('Deleting contractor.  You will be notified once complete.');

    this.http.delete('https://' + this.devService.domain + '/api/v1/contractors/' + contractorID).subscribe(
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

  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }

}
