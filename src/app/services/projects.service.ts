import { ProjectShort } from '../models/projectShort.model';
import { DevService } from './dev.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const alertify = require('alertify.js');

@Injectable()
export class ProjectsService {
  projectListChanged = new EventEmitter<ProjectShort[]>();
  currentProjectID = '';
  
  constructor(private http: HttpClient, private devService: DevService) { }

  fetchProjects() {
    console.log('https://' + this.devService.domain + '/api/v1/projects');
    this.http.get<ProjectShort[]>('https://' + this.devService.domain + '/api/v1/projects').subscribe(
      resp => {
        console.log(resp);
        this.projectListChanged.emit(resp);
      },
      (error: HttpErrorResponse) => {
       // alertify.error(error.status + ' - ' + error.statusText);
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
