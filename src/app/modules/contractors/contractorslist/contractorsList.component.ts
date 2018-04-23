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

  constructor() { }

  ngOnInit() {
  }

}
