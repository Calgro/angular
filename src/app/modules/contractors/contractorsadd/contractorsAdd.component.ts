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
    const formData: FormData = new FormData();
    formData.append('name', name);

console.log(name);
console.log(formData);

    this.contractorSubscription = this.contractorsService.name = name;


console.log(this.contractorsService.name);


//    if (this.contractorsService.name === null) {
//      alertify.error('Name of constructor is required');
//    } else {
//        alertify.success('Saving contractor.  You will be notified once complete.');
//// Send JSON object to DB
//        console.log(this.contractorsService.name);
//        this.http.put('https://' + this.devService.domain + '/api/v1/contractors', this.contractorsService.name).subscribe(
//          (resp: Outcome) => {
//            if (resp.statusCode === '200') {
//              alertify.success(resp.message);
//            }
//          },
//          (error: HttpErrorResponse) => {
//            alertify.error(error.status + ' - ' + error.statusText);
//          }
//        );
//
//
//// Get message from API
//
//
//     // this.router.navigate(['/admin/contractors/list']);
//    }

  }

//  contractorSave(contractorName) {
//    this.contractorSubscription = this.contractorsService.name = contractorName;
//    if (this.contractorsService.name === null) {
//      alertify.error('Name of constructor is required');
//    } else {
//        alertify.success('Saving contractor.  You will be notified once complete.');
//// Send JSON object to DB
//        console.log(this.contractorsService.name);
//        this.http.put('https://' + this.devService.domain + '/api/v1/contractors', this.contractorsService.name).subscribe(
//          (resp: Outcome) => {
//            if (resp.statusCode === '200') {
//              alertify.success(resp.message);
//            }
//          },
//          (error: HttpErrorResponse) => {
//            alertify.error(error.status + ' - ' + error.statusText);
//          }
//        );
//
//
//// Get message from API
//
//
//      this.router.navigate(['/admin/contractors/list']);
//    }
//  }


  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }

}
