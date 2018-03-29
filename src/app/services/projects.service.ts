import { ProjectShort } from '../models/projectShort.model';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ProjectsService {
  projectListChanged = new EventEmitter<ProjectShort[]>();
  currentProjectID = '';
  
  constructor(private http: HttpClient) { }

  fetchProjects() {
    this.http.get<ProjectShort[]>('https://www.calgrois.co.za/api/v1/projects').subscribe(
      resp => {
        this.projectListChanged.emit(resp);
      },
      (error: HttpErrorResponse) => {
        alertify.error(error.status + ' - ' + error.statusText);
       }
    );
  }
  
  getProject() {
    return this.currentProjectID;
  }
  
  setProject(projectID) {
    this.currentProjectID = projectID;
  }
}
