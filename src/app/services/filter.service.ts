import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable()
export class FilterService {

  constructor() { }
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

  dropdownConvert(optionValue) {
    if (optionValue === null) {
      return 'instruction';
    } else if (optionValue === 'instruction') {
      return null;
    } else {
      return optionValue;
    }
}

}
