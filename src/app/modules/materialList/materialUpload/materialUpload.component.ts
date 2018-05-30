import { Outcome } from '../../../models/outcome.model';
import { DevService } from '../../../services/dev.service';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const alertify = require('alertify.js');

@Component({
  selector: 'app-materialupload',
  templateUrl: './materialUpload.component.html',
  styleUrls: ['./materialUpload.component.css']
})

export class MaterialUploadComponent implements OnInit {
  materialsForm: FormGroup;

   // SETTING UP DOCUMENT PROPERTIES
  documentLocation = 'Material List';
  documentUploaded = false;
  documentName: string = null;
  documentType = 'Material List';
  buildingID = this.filterService.buildingID[0];

  // DROPZONE UPLOAD PROPERTY
  DZConfig: DropzoneConfigInterface = {
    params: {
        'docLocation': this.documentLocation
      }
  };

  checked = '';
  MaterialListData = {
    'requestType': 'Upload',
    'documentName': null,
    'documentLocation': this.documentLocation,
    'documentType': this.documentType,
    'buildingID': null,
  };

  constructor(
    private materialsService: MaterialsService,
    private http: HttpClient,
    private router: Router,
    private devService: DevService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.updateBreadcrumb();
    this.materialsForm = new FormGroup({});
  }

  onUploadSuccess(event) {
    this.filterService.updateBreadcrumb();
    this.documentUploaded = true;
    this.documentName = event[0].name;
    alertify.success(this.documentName + ' Is Ready To Be Uploaded');
    
  }

  onUploadError(event) {
    this.filterService.updateBreadcrumb();
    this.documentUploaded = false;
    alertify.error(this.documentName + ' Upload Failed');
  }

  onUpload() {
    this.filterService.updateBreadcrumb();
    this.MaterialListData.documentName = this.documentName;
    this.MaterialListData.documentLocation = this.documentLocation;
    this.MaterialListData.documentType = this.documentType;
    this.MaterialListData.buildingID = this.buildingID;
    console.log(this.MaterialListData);
    alertify.success('Uploading Material List. This may take a few minutes.');
    this.http.post('https://' + this.devService.domain + '/api/v1/materials', this.MaterialListData).subscribe(
      (resp: Outcome) => {
        if (resp.statusCode === '200') {
          alertify.success(resp.message);
         }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
      }
    );
   // this.router.navigate(['/admin/materialList/list']);
  }
}
