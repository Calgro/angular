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
  contractor: Contractors = new Contractors(null);
  contractorLoaded = false;
  noContractor = false;

  constructor(
    private contractorsService: ContractorsService,
    private router: Router
  ) { }

  contractorSubscription;
  contractorID = this.contractorsService.contractorID;
  contractorName = this.contractorsService.name;

  ngOnInit() {
    // Load the details of a specific contractor
    this.contractorSubscription = this.contractorsService.contractorDetailLoader.subscribe(
        (contractor: Contractors) => {
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
  ngOnDestroy() {
    this.contractorSubscription.unsubscribe();
  }

}
