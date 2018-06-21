import { BuildingTypologiesShort } from '../../../models/buildingTypologiesShort.model';
import { Outcome } from '../../../models/outcome.model';
import { BuildingTypologiesService } from '../../../services/buildingtypologies.service';
import { DevService } from '../../../services/dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-buildingtypologiesremove',
  templateUrl: './buildingTypologiesRemove.component.html',
  styleUrls: ['./buildingTypologiesRemove.component.css']
})
export class BuildingTypologiesRemoveComponent implements OnInit {

  constructor(
    private buildingTypologiesService: BuildingTypologiesService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  buildingTypologies: BuildingTypologiesShort = new BuildingTypologiesShort(null, null);
  buildingTypologiesLoaded = false;
  noBuildingTypologies = false;
  buildingTypologiesSubscription;
  typologyID = this.buildingTypologiesService.typologyID;

  ngOnInit() {
    this.buildingTypologiesSubscription = this.buildingTypologiesService.buildingTypologiesDetailLoader.subscribe(
      (buildingTypologies: BuildingTypologiesShort) => {
        if (buildingTypologies !== null) {
            this.buildingTypologies = buildingTypologies;
        } else {
            this.noBuildingTypologies = true;
        }
        this.buildingTypologiesLoaded = true;
      }
    );

    this.buildingTypologiesService.fetchBuildingTypology(this.typologyID);
  }

  onDelete(form: NgForm) {
    const typologyID = this.buildingTypologies.typologyID;

    alertify.success('Deleting building typology.  You will be notified once complete.');

    this.http.delete('https://' + this.devService.domain + '/api/v1/buildingTypologies/' + typologyID).subscribe(
      (resp: Outcome) => {
        if (resp.statusCode === '200') {
            alertify.success(resp.message);
            this.router.navigate(['/admin/buildingTypologies/list']);
        }
      },
      (error: HttpErrorResponse) => {
       alertify.error(error.status + ' - ' + error.statusText);
      }
    );
  }

  ngOnDestroy() {
    this.buildingTypologiesSubscription.unsubscribe();
  }
}
