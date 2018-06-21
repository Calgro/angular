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
  selector: 'app-buildingtypologiesedit',
  templateUrl: './buildingTypologiesEdit.component.html',
  styleUrls: ['./buildingTypologiesEdit.component.css']
})
export class BuildingTypologiesEditComponent implements OnInit {

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

  onSave(form: NgForm) {
    const name = form.value.BuildingTypologyName;
    const typologyID = this.buildingTypologies.typologyID;

    if (name === '') {
      alertify.error('The building typology name is required');
    } else {
      alertify.success('Updating building typology.  You will be notified once complete.');

      const buildingTypologiesUpdate = {
        'name': name,
        'typologyID': typologyID
      };

      console.log(buildingTypologiesUpdate);
      this.http.put('https://' + this.devService.domain + '/api/v1/buildingTypologies', buildingTypologiesUpdate).subscribe(
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
  }

  ngOnDestroy() {
      this.buildingTypologiesSubscription.unsubscribe();
  }

}
