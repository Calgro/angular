import { Component, OnInit } from '@angular/core';
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
    selector: 'app-contractorsedit',
    templateUrl: './contractorsEdit.component.html',
    styleUrls: ['./contractorsEdit.component.css']
})
  
export class ContractorsEditComponent implements OnInit {
    contractor: ContractorShort;
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
  
    onSave(form: NgForm) {
        const name = form.value.ContractorName;
        const contractorID = this.contractor.contractorID;
    
        if (name === '') {
            alertify.error('Contractor\'s name is required');
        } else {
            alertify.success('Updating contractor.  You will be notified once complete.');
      
            const contractorUpdate = {
                'name': name
                'contractorID': contractorID
            };
      
            this.http.put('https://' + this.devService.domain + '/api/v1/contractors', contractorUpdate).subscribe(
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