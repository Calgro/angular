import { DevService } from '../../../services/dev.service';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
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
//  order: Order = new Order(null, null, null, null, null, null, null, null);
//  ordersLoaded = false;
//  showDetail = false;
//  listMode = this.ordersService.listMode;
//  stockMode = this.filterService.stockMode;

   // SETTING UP DOCUMENT PROPERTIES
  documentLocation = 'materialsList';
  documentUploaded = false;
  documentName: string = null;
  documentType = 'Materials List';

  // DROPZONE UPLOAD PROPERTY
  DZConfig: DropzoneConfigInterface = {
    params: {
        'docLocation': this.documentLocation
      }
  };

  checked = '';
  MaterialListData = {
          'mode': 'Check-In',
//          'PONumber': this.ordersService.orderID,
          'documentName': null,
          'documentLocation': this.documentLocation,
          'documentType': this.documentType,
          'materials': [{
          'materialID': null,
          'checkedIn': true,
          'quantity' : null,
           }]
  };

  constructor(
    private materialsService: MaterialsService,
    private http: HttpClient,
    private router: Router,
    private devService: DevService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  onUploadSuccess(event) {
    this.documentUploaded = true;
    this.documentName = event[0].name;
    console.log(event);
    // alertify.success(this.documentName);
  }

  onUploadError(event) {
    this.documentUploaded = false;
    alertify.error('Document Upload Failed');
  }

  onUpload(event) {
    alertify.success('Upload and save');
//          this.MaterialListData.documentName = this.documentName;
//          this.MaterialListData.documentType = this.documentType;
//          console.log(this.MaterialListData);
//          this.http.put('https://' + this.devService.domain + '/api/v1/materials', this.MaterialListData).subscribe(
//            (resp: Outcome) => {
//              if (resp.statusCode === '200') {
//                alertify.success(resp.message);
//               }
//            },
//            (error: HttpErrorResponse) => {
//              alertify.error(error.status + ' - ' + error.statusText);
//            }
//          );
//          this.router.navigate(['/admin/materialList/list']);
  }
}
