import { DepartmentShort } from '../models/departmentShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class DepartmentsService {
  departmentListChanged = new EventEmitter<DepartmentShort[]>();

  constructor(private http: HttpClient, private devService: DevService) { }

  fetchDepartments() {
    this.http.get<DepartmentShort[]>('https://' + this.devService.domain + '/api/v1/departments/').subscribe(
      resp => {
        if (resp) {
          this.departmentListChanged.emit(resp);
        } else {
          this.departmentListChanged.emit([new DepartmentShort('', 'None Found', '')]);
        }
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
}
