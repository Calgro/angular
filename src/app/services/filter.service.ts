import { Injectable, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable()
export class FilterService {

  constructor() { }
  breadcrumbChanged = new EventEmitter<String>();
  projectID = null;
  townshipID = null;
  erfID = null;
  PUAID = null;
  buildingID = null;
  unitID = null;
  zoningID = null;
  materialListType = null;
  materialID = null;
  contractorID = null;
  departmentID = null;
  stockMode = 'Check-In';
  placedBy = null;
  breadcrumb = null;
  projectName = null;
  townshipName = null;
  erfName = null;
  PUAName = null;
  buildingName = null;
  unitName = null;
  dropdownConvert(optionValue) {
    if (optionValue === null) {
      return 'instruction';
    } else if (optionValue === 'instruction') {
      return null;
    } else {
      return optionValue;
    }
  }
  
  updateProjectName (projectName) {
    this.projectName = projectName;
    this.townshipName = null;
    this.erfName = null;
    this.PUAName = null;
    this.buildingName = null;
    this.unitName = null;
  }
  updateTownshipName (townshipName) {
    this.townshipName = townshipName;
    this.erfName = null;
    this.PUAName = null;
    this.buildingName = null;
    this.unitName = null;
  }
  updateErfName (erfName) {
    this.erfName = erfName;
    this.PUAName = null;
    this.buildingName = null;
    this.unitName = null;
  }
  updatePUAName (PUAName) {
    this.PUAName = PUAName;
    this.buildingName = null;
    this.unitName = null;
  }
  updateBuildingName (buildingName) {
    this.buildingName = buildingName;
    this.unitName = null;
  }
  updateUnitName (unitName) {
    this.unitName = unitName;
  }
  
  updateBreadcrumb () {
    if (this.projectName !== null) {
      this.breadcrumb = this.projectName;
    }
    if (this.townshipName !== null) {
      this.breadcrumb += ' / ' + this.townshipName;
    }
    if (this.erfName !== null) {
      this.breadcrumb += ' / ' + this.erfName;
    }
    if (this.PUAName !== null) {
      this.breadcrumb += ' / ' + this.PUAName;
    }
    if (this.buildingName !== null) {
      this.breadcrumb += ' / ' + this.buildingName;
    }
    if (this.unitName !== null) {
      this.breadcrumb += ' / ' + this.unitName;
    }
    this.breadcrumbChanged.emit(this.breadcrumb);
  }

}
