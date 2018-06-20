import { BuildingTypologies } from '../../../models/buildingTypologies.model';
import { BuildingTypologiesShort } from '../../../models/buildingTypologiesShort.model';
import { BuildingTypologiesService } from '../../../services/buildingtypologies.service';
import { FilterService } from '../../../services/filter.service';
import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingtypologieslist',
  templateUrl: './buildingTypologiesList.component.html',
  styleUrls: ['./buildingTypologiesList.component.css']
})
export class BuildingTypologiesListComponent implements OnInit {

  constructor(
    private buildingTypologiesService: BuildingTypologiesService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
    ) { }

   defaultBuildingTypologies: BuildingTypologiesShort = new BuildingTypologiesShort('', '');
   buildingTypologies: BuildingTypologies = new BuildingTypologies([this.defaultBuildingTypologies]);
  // buildingTypologies: BuildingTypologies = new BuildingTypologies(null);
  typologyID = null;
  name = null;
  buildingTypologiesSubscription;
  buildingTypologiesLoaded = false;
  noBuildingTypologies = false;

  ngOnInit() {
    this.buildingTypologiesSubscription = this.buildingTypologiesService.buildingTypologiesListChanged.subscribe(
        (buildingTypologies: BuildingTypologies) => {
          if (buildingTypologies !== null) {
            this.buildingTypologies = buildingTypologies;
          } else {
            this.noBuildingTypologies = true;
          }
          this.buildingTypologiesLoaded = true;
       }
      );

    this.buildingTypologiesService.fetchBuildingTypologies(this.typologyID, this.name);
  }

  ngOnDestroy() {
    this.buildingTypologiesSubscription.unsubscribe();
  }
}
