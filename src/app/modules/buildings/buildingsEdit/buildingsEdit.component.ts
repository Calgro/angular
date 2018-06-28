import { BuildingShort } from '../../../models/buildingShort.model';
import { BuildingTypologies } from '../../../models/buildingTypologies.model';
import { BuildingTypologiesShort } from '../../../models/buildingTypologiesShort.model';
import { Outcome } from '../../../models/outcome.model';
import { BuildingsService } from '../../../services/buildings.service';
import { BuildingTypologiesService } from '../../../services/buildingtypologies.service';
import { DevService } from '../../../services/dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingsedit',
  templateUrl: './buildingsEdit.component.html',
  styleUrls: ['./buildingsEdit.component.css']
})

export class BuildingsEditComponent implements OnInit {

  constructor(
    private buildingsService: BuildingsService,
    private buildingTypologiesService: BuildingTypologiesService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  building: BuildingShort = new BuildingShort('', '', '', '', '', '');
  buildingID = this.buildingsService.currentBuildingID;
  buildingLoaded = false;
  noBuilding = false;
  buildingSubscription;
  defaultBuildingTypologies: BuildingTypologiesShort = new BuildingTypologiesShort('', '');
  buildingTypologies: BuildingTypologies = new BuildingTypologies([this.defaultBuildingTypologies]);
  typologyID = 'instruction';

  ngOnInit() {
    this.buildingSubscription = this.buildingsService.buildingListChanged.subscribe(
      (building: BuildingShort) => {
        if (building !== null) {
            this.building = building;
        } else {
            this.noBuilding = true;
        }
        this.buildingLoaded = true;
      }
    );
    this.buildingsService.fetchBuilding(this.buildingID);

    this.buildingSubscription = this.buildingTypologiesService.buildingTypologiesListChanged.subscribe(
      (buildingTypologies: BuildingTypologies) => {
        this.buildingTypologies = buildingTypologies;
      }
    );
    this.buildingTypologiesService.fetchBuildingTypologies(null, null);
  }

  onSave(form: NgForm) {
    const name = form.value.BuildingName;
    const typologyID = form.value.typologyID;
    const area = form.value.BuildingArea;
    const coverage = form.value.BuildingCoverage;
    const walkwayArea = form.value.BuildingWalkwayArea;
    const staircaseArea = form.value.BuildingStaircaseArea;
    const sectionalTitleArea = form.value.BuildingSectionalTitleArea;
    const state = form.value.BuildingState;
    const buildingID = this.building.buildingID;

    if (name === '') {
      alertify.error('Building name is required');
    } else {
      alertify.success('Updating building.  You will be notified once complete.');

      const buildingsUpdate = {
        'buildingID': buildingID,
        'name': name,
        'typologyID': typologyID,
        'area': area,
        'coverage': coverage,
        'walkwayArea': walkwayArea,
        'staircaseArea': staircaseArea,
        'sectionalTitleArea': sectionalTitleArea,
        'state': state
      };

      this.http.put('https://' + this.devService.domain + '/api/v1/buildings', buildingsUpdate).subscribe(
        (resp: Outcome) => {
          if (resp.statusCode === '200') {
            alertify.success(resp.message);
            this.router.navigate(['/admin/buildings/list']);
          }
        },
        (error: HttpErrorResponse) => {
         alertify.error(error.status + ' - ' + error.statusText);
        }
      );
    }
  }

  ngOnDestroy() {
      this.buildingSubscription.unsubscribe();
  }
}
