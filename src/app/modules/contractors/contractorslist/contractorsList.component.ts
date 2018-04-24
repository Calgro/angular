import { Component, OnInit } from '@angular/core';
import { ContractorsService } from '../../../services/contractors.service';
import { FilterService } from '../../../services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractorslist',
  templateUrl: './contractorsList.component.html',
  styleUrls: ['./contractorsList.component.css']
})

export class ContractorsListComponent implements OnInit {
  contractorsForm: FormGroup;
  order: Order = new Order(null, null, null, null, null, null, null, null);
  contractorsLoaded = false;
  showDetail = false;
  listMode = this.ordersService.listMode;
  stockMode = this.filterService.stockMode;

  constructor() { }

  ngOnInit() {
  }

}
