import { MaterialDetail } from '../../../models/materialDetail.model';
import { Materials } from '../../../models/materials.model';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-materiallist',
  templateUrl: './MaterialList.component.html',
  styleUrls: ['./MaterialList.component.css']
})
export class MaterialListComponent implements OnInit {

  constructor(
    private materialsService: MaterialsService,
    private filterService: FilterService,
    private http: HttpClient,
    private router: Router,
    ) { }

  defaultMaterial: MaterialDetail = new MaterialDetail('', 'Select a Building First', null, null, null, null, null, null, null, null);
  materials: Materials = new Materials([this.defaultMaterial]);
  projectID = this.filterService.projectID;
  townshipID = this.filterService.townshipID;
  erfID = this.filterService.erfID;
  PUAID = this.filterService.PUAID;
  buildingID = this.filterService.buildingID;
  materialListType = this.filterService.materialListType;
  materialID = this.filterService.materialID;
  materialSubscription;
  noMaterials = false;
  materialsLoaded = false;

  ngOnInit() {
    // CONTRACTS
    this.materialSubscription = this.materialsService.materialListChanged.subscribe(
        (materials: Materials) => {
          if (materials.materials !== null) {
            this.materials = materials;
          } else {
            this.noMaterials = true;
          }
          this.materialsLoaded = true;
       }
      );

    this.materialsService.fetchMaterials(this.buildingID, this.materialListType, this.materialID);
  }

  loadFilter() {
    this.router.navigate(['/admin/materialList/filter']);
  }

}
