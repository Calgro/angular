import { BuildingShort } from '../../../models/buildingShort.model';
import { BuildingsService } from '../../../services/buildings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingsdetail',
  templateUrl: './buildingsDetail.component.html',
  styleUrls: ['./buildingsDetail.component.css']
})
export class BuildingsDetailComponent implements OnInit {

  constructor(
    private buildingsService: BuildingsService,
    private router: Router,
  ) { }

  building: BuildingShort = new BuildingShort('', '', '', '', '', '');
  buildingID = this.buildingsService.currentBuildingID;
  name = null;
  buildingsSubscription;
  buildingsLoaded = false;
  noBuildings = false;

  ngOnInit() {
    this.buildingsSubscription = this.buildingsService.buildingListChanged.subscribe(
      (building: BuildingShort) => {
        console.log(building);
        if (building !== null) {
          this.building = building;
        } else {
          this.noBuildings = true;
        }
        this.buildingsLoaded = true;
      }
    );

    this.buildingsService.fetchBuilding(this.buildingID);
  }

  buildingDelete(buildingID)  {
    this.buildingsSubscription = this.buildingsService.currentBuildingID = buildingID;
    this.router.navigate(['/admin/buildings/remove']);
  }

  ngOnDestroy() {
    this.buildingsSubscription.unsubscribe();
  }

}
