import { BuildingTypologies } from '../../../models/buildingTypologies.model';
import { BuildingTypologiesShort } from '../../../models/buildingTypologiesShort.model';
import { BuildingTypologiesService } from '../../../services/buildingtypologies.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildingtypologiesdetail',
  templateUrl: './buildingTypologiesDetail.component.html',
  styleUrls: ['./buildingTypologiesDetail.component.css']
})
export class BuildingTypologiesDetailComponent implements OnInit {

  constructor(
    private buildingTypologiesService: BuildingTypologiesService,
    private router: Router,
  ) { }

  buildingTypologies: BuildingTypologiesShort = new BuildingTypologiesShort(null, null);
  buildingTypologiesLoaded = false;
  noBuildingTypologies = false;
  buildingTypologiesSubscription;
  typologyID = this.buildingTypologiesService.typologyID;

  ngOnInit() {
    this.buildingTypologiesSubscription = this.buildingTypologiesService.buildingTypologiesDetailLoader.subscribe(
        (buildingTypologies: BuildingTypologiesShort) => {
            console.log(buildingTypologies);
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

  buildingTypologiesEdit(typologyID) {
    this.buildingTypologiesService.typologyID = typologyID;
    this.router.navigate(['/admin/buildingTypologies/edit']);
  }

  buildingTypologiesDelete(typologyID){
    this.buildingTypologiesService.typologyID = typologyID;
    this.router.navigate(['/admin/buildingTypologies/remove']);
  }

  ngOnDestroy() {
    this.buildingTypologiesSubscription.unsubscribe();
  }

}
