import { Component, OnInit } from '@angular/core';

import { Projects } from '../../../models/projects.model';
import { ProjectShort } from '../../../models/projectShort.model';
import { Townships } from '../../../models/townships.model';
import { TownshipShort } from '../../../models/townshipShort.model';
import { Erven } from '../../../models/erven.model';
import { ErfShort } from '../../../models/erfShort.model';
import { PrivateUseAreas } from '../../../models/privateUseAreas.model';
import { PrivateUseAreaShort } from '../../../models/privateUseAreaShort.model';
import { Buildings } from '../../../models/buildings.model';
import { BuildingShort } from '../../../models/buildingShort.model';

import { ProjectsService } from '../../../services/projects.service';
import { TownshipsService } from '../../../services/townships.service';
import { ErvenService } from '../../../services/erven.service';
import { PuaService } from '../../../services/pua.service';
import { BuildingsService } from '../../../services/buildings.service';

import { FilterService } from '../../../services/filter.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-variationorderslist',
  templateUrl: './variationOrdersList.component.html',
  styleUrls: ['./variationOrdersList.component.css']
})
export class VariationOrdersListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
