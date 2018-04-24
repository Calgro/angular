import { Component, OnInit } from '@angular/core';
import { Contractors } from '../../../models/contractors.model';
// why call the contractorShort model if the contractors model calls it?
import { ContractorShort } from '../../../models/contractorShort.model';
import { ContractorsService } from '../../../services/contractors.service';
import { FilterService } from '../../../services/filter.service';
import { Router } from '@angular/router';


// Do we need to call alertify.js to enable the alerts/message functionality? That's the HTTP codes that we return to the user?
const alertify = require('alertify.js');


@Component({
  selector: 'app-contractorslist',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.css']
})


// I'm getting ContractorsListComponent from the "export class ContractorsService {" line in the contractors service, is that correct?
export class ContractorsListComponent implements OnInit {
//  We don't have the following 3 lines of code in the Orders Filter .ts ... Do I need to have this because we are creating a list?
  contractors: Contractors = new Contractors(null);  // Is contractors a new initialized variable that inherits the properties of the Contractors model (which means it inherits the ContractorShort properties)?
  contractorsLoaded = true;  // Initializing for line 51 !!! change to false once the backend is completed !!!
  noContractors = true;  // Initializing for line 49    !!! change to false once the backend is completed !!!  *** Tested when manually setting it's value to true and false



  constructor(
    // Must we create a variable for each service we use in the .ts ?
    private contractorsService: ContractorsService,
    private filterService: FilterService,
    private router: Router
      )  { }



  ngOnInit() {
      // Load a list of contractors
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
  }

}
