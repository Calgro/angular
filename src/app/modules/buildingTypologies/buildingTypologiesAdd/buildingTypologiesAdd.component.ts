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
  selector: 'app-buildingtypologiesadd',
  templateUrl: './buildingTypologiesAdd.component.html',
  styleUrls: ['./buildingTypologiesAdd.component.css']
})
export class BuildingTypologiesAddComponent {

  constructor(
    private buildingTypologiesService: BuildingTypologiesService,
    private router: Router,
    private http: HttpClient,
    private devService: DevService
  ) { }

  buildingTypologiesSubscription;

  onSave(form: NgForm) {
    const name = form.value.BuildingTypologyName;

    if (name === '') {
      alertify.error('The building typology name is required');
    } else {
      alertify.success('Saving building typology.  You will be notified once complete.');

      const buildingTypologiesAdd = {
        'name': name
      };

      this.buildingTypologiesSubscription = this.http.post('https://' + this.devService.domain + '/api/v1/buildingTypologies', buildingTypologiesAdd).subscribe(
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
