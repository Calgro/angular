import { MaterialDetail } from '../../../models/materialDetail.model';
import { Materials } from '../../../models/materials.model';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-placeordersprocessinglist',
  templateUrl: './placeordersprocessinglist.component.html',
  styleUrls: ['./placeordersprocessinglist.component.css']
})
export class PlaceOrdersProcessingListComponent implements OnInit {

  constructor(
    private materialsService: MaterialsService,
    private filterService: FilterService,
    
    ) { }
 
  defaultMaterial: MaterialDetail = new MaterialDetail('', 'Select a Building First', null, null, null, null, null, null);
  materials: Materials = new Materials([this.defaultMaterial]);
  checked = '';
  projectID = this.filterService.projectID;
  townshipID = this.filterService.townshipID;
  erfID = this.filterService.erfID;
  PUAID = this.filterService.PUAID;
  buildingID = this.filterService.buildingID;
  materialListType = this.filterService.materialListType;
  materialID = this.filterService.materialID;
  departmentID = this.filterService.departmentID;
  ngOnInit() {
    console.log(this.projectID);


    this.materialsService.materialListChanged.subscribe(
        (materials: Materials) => {
          this.materials = materials;
          }
      );
    this.materialsService.fetchMaterials(this.buildingID, this.materialListType);
  }

  checkToggle() {
    if (this.checked === '') {
      this.checked = 'checked';
    } else {
      this.checked = '';
    }
      
  }

}
