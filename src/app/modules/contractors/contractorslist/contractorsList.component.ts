import { Component, OnInit } from '@angular/core';
import { Contractors } from '../../../models/contractors.model';
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



  ngOnInit() {
      // Load a list of all of the contractors
      this.contractorsService.contractorListChanged.subscribe(
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

}
