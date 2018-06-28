import { BuildingShort } from '../../../models/buildingShort.model';
import { Buildings } from '../../../models/buildings.model';
import { Outcome } from '../../../models/outcome.model';
import { BuildingsService } from '../../../services/buildings.service';
import { DevService } from '../../../services/dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingsremove',
  templateUrl: './buildingsRemove.component.html',
  styleUrls: ['./buildingsRemove.component.css']
})
export class BuildingsRemoveComponent implements OnInit {

  constructor(
    private buildingsService: BuildingsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  defaultBuilding: BuildingShort = new BuildingShort('', '', '', '', '', '');
  buildings: Buildings = new Buildings([this.defaultBuilding]);
  buildingsLoaded = false;
  noBuildings = false;
  buildingsSubscription;
  buildingID = this.buildingsService.currentBuildingID;

  ngOnInit() {
    this.buildingsSubscription = this.buildingsService.buildingListChanged.subscribe(
      (buildings: BuildingShort) => {
        if (buildings !== null) {
            this.defaultBuilding = buildings;
        } else {
            this.noBuildings = true;
        }
        this.buildingsLoaded = true;
      }
    );

    this.buildingsService.fetchBuilding(this.buildingID);
  }

  onDelete(form: NgForm) {
    const buildingID = this.defaultBuilding.buildingID;

    alertify.success('Deleting building.  You will be notified once complete.');

    this.http.delete('https://' + this.devService.domain + '/api/v1/buildings/' + buildingID).subscribe(
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

  ngOnDestroy() {
    this.buildingsSubscription.unsubscribe();
  }

}
