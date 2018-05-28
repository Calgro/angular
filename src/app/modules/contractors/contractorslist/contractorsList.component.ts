import { Component, OnInit } from '@angular/core';
import { Contractors } from '../../../models/contractors.model';
import { ContractorShort } from '../../../models/contractorShort.model';
import { ContractorsService } from '../../../services/contractors.service';
import { FilterService } from '../../../services/filter.service';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-contractorslist',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.css']
})

export class ContractorsListComponent implements OnInit {
  contractors: Contractors = new Contractors(null);
  contractorsLoaded = false;
  noContractors = false;


  constructor(
    private contractorsService: ContractorsService,
    private filterService: FilterService,
    private router: Router
  )  { }

  contractorsSubscription;

  ngOnInit() {
      // Load a list of all of the contractors
      this.contractorsSubscription = this.contractorsService.contractorListChanged.subscribe(
          (contractors: Contractors) => {
              console.log(contractors);
              if (contractors !== null) {
                this.contractors = contractors;
              } else {
                this.noContractors = true;
              }
              this.contractorsLoaded = true;
           }
        );
      this.contractorsService.fetchContractors(null, null, null, null, null);
  }
  contractorAdd() {
    this.router.navigate(['/admin/contractors/add']);
  }

  loadDetailed(contractorID) {
    this.contractorsService.contractorID = contractorID;
      this.router.navigate(['/admin/contractors/detail']);
  }

  ngOnDestroy() {
    this.contractorsSubscription.unsubscribe();
  }

}
