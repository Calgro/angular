import { BuildingShort } from '../../../models/buildingShort.model';
import { Buildings } from '../../../models/buildings.model';
import { BuildingsService } from '../../../services/buildings.service';
import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingslist',
  templateUrl: './buildingsList.component.html',
  styleUrls: ['./buildingsList.component.css']
})
export class BuildingsListComponent implements OnInit {

  constructor(
    private buildingsService: BuildingsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
    ) { }

  defaultBuilding: BuildingShort = new BuildingShort('', '', '', '', '', '');
  buildings: Buildings = new Buildings([this.defaultBuilding]);
  buildingID = null;
  name = null;
  buildingsSubscription;
  buildingsLoaded = false;
  noBuildings = false;

  ngOnInit() {
    this.buildingsSubscription = this.buildingsService.buildingListChanged.subscribe(
        (buildings: Buildings) => {
          if (buildings !== null) {
            this.buildings = buildings;
          } else {
            this.noBuildings = true;
          }
          this.buildingsLoaded = true;
       }
      );

    this.buildingsService.fetchBuildings('', '', '', '', '', '', '', '', '');
  }

  loadDetailed(buildingID) {
    this.buildingsService.currentBuildingID = buildingID;
      this.router.navigate(['/admin/buildings/detail']);
  }

  ngOnDestroy() {
    this.buildingsSubscription.unsubscribe();
  }

}
