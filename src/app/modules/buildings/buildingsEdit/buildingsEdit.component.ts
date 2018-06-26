import { BuildingShort } from '../../../models/buildingShort.model';
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
  selector: 'app-buildingsedit',
  templateUrl: './buildingsEdit.component.html',
  styleUrls: ['./buildingsEdit.component.css']
})

export class BuildingsEditComponent implements OnInit {

  constructor(
    private buildingsService: BuildingsService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  building: BuildingShort = new BuildingShort('', '', '', '', '', '');
  buildingID = this.buildingsService.currentBuildingID;
  buildingLoaded = false;
  noBuilding = false;
  buildingSubscription;

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
  }

  onSave(form: NgForm) {
    const name = form.value.BuildingName;
    const contractorID = this.building.buildingID;

    if (name === '') {
      alertify.error('Building name is required');
    } else {
      alertify.success('Updating building.  You will be notified once complete.');

      const buildingsUpdate = {
        'name': name,
        'contractorID': contractorID
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
