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
  selector: 'app-buildingsadd',
  templateUrl: './buildingsAdd.component.html',
  styleUrls: ['./buildingsAdd.component.css']
})
export class BuildingsAddComponent implements OnInit {
  [x: string]: any;

  constructor(
    private buildingsService: BuildingsService,
    private buildingTypologiesService: BuildingTypologiesService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService,
  ) { }

  buildingsSubscription;
  defaultBuildingTypologies: BuildingTypologiesShort = new BuildingTypologiesShort('', '');
  buildingTypologies: BuildingTypologies = new BuildingTypologies([this.defaultBuildingTypologies]);
  noBuildingTypologies = false;
  buildingTypologiesLoaded = false;

  typologyID = 'instruction';

  ngOnInit() {
    this.buildingsSubscription = this.buildingTypologiesService.buildingTypologiesListChanged.subscribe(
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

    if (name === '') {
      alertify.error('Building name is required');
    } else {
      alertify.success('Saving contractor.  You will be notified once complete.');

      const buildingAdd = {
        'name': name,
        'typologyID': typologyID,
        'area': area,
        'coverage': coverage,
        'walkwayArea': walkwayArea,
        'staircaseArea': staircaseArea,
        'sectionalTitleArea': sectionalTitleArea,
        'state': state
      };

      this.buildingsSubscription = this.http.post('https://' + this.devService.domain + '/api/v1/buildings', buildingAdd).subscribe(
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
    this.buildingsSubscription.unsubscribe();
  }
}