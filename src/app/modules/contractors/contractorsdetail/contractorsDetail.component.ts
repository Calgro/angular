import { Component, OnInit } from '@angular/core';
import { Contractors } from '../../../models/contractors.model';
import { ContractorShort } from '../../../models/contractorShort.model';
import { ContractorsService } from '../../../services/contractors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractorsdetail',
  templateUrl: './contractorsDetail.component.html',
  styleUrls: ['./contractorsDetail.component.css']
})
export class ContractorsDetailComponent implements OnInit {
  contractor: ContractorShort;
  contractorLoaded = false;
  noContractor = false;

  constructor(
    private contractorsService: ContractorsService,
    private router: Router
  ) { }

  contractorSubscription;
  contractorID = this.contractorsService.contractorID;


  ngOnInit() {
    // Load the details of a specific contractor
    this.contractorSubscription = this.contractorsService.contractorDetailLoader.subscribe(
        (contractor: ContractorShort) => {
            console.log(contractor);
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

  contractorEdit(contractorID) {
    this.contractorsService.contractorID = contractorID;
    this.router.navigate(['/admin/contractors/edit']);
  }

  contractorDelete(contractorID) {
    this.contractorsService.contractorID = contractorID;
    this.router.navigate(['/admin/contractors/remove']);
  }

  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }

}