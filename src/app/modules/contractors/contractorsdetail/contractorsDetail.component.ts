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
  contractors: Contractors = new Contractors(null);  
  contractorsLoaded = false;
  
  constructor(
    private contractorsService: ContractorsService,
    private router: Router
  ) { }
  
  ngOnInit() {
    // Load the details of a specific contractor
    this.contractorsService.contractorDetailLoader.subscribe(
        (contractors: Contractors) => {
            console.log(contractors);
            if (contractors !== null) {
              this.contractors = contractors;
            } 
            this.contractorsLoaded = true;
         }
      );
    this.contractorsService.fetchContractor();
  }

}
