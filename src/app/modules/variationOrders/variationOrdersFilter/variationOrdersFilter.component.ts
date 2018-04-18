import { Component, OnInit } from '@angular/core';
import { Projects } from '../../../models/projects.model';
import { ProjectShort } from '../../../models/projectShort.model';
import { Townships } from '../../../models/townships.model';
import { TownshipShort } from '../../../models/townshipShort.model';
import { Erven } from '../../../models/erven.model';
import { ErfShort } from '../../../models/erfShort.model';
import { PrivateUseAreas } from '../../../models/privateUseAreas.model';
import { PrivateUseAreaShort } from '../../../models/privateUseAreaShort.model';
import { Buildings } from '../../../models/buildings.model';
import { BuildingShort } from '../../../models/buildingShort.model';
import { ProjectsService } from '../../../services/projects.service';
import { TownshipsService } from '../../../services/townships.service';
import { ErvenService } from '../../../services/erven.service';
import { PuaService } from '../../../services/pua.service';
import { BuildingsService } from '../../../services/buildings.service';
import { FilterService } from '../../../services/filter.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-variationordersfilter',
  templateUrl: './variationOrdersFilter.component.html',
  styleUrls: ['./variationOrdersFilter.component.css']
})
export class VariationOrdersFilterComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private townshipsService: TownshipsService,
    private ervenService: ErvenService,
    private puaService: PuaService,
    private buildingsService: BuildingsService,
    private filterService: FilterService,
    private router: Router) { }
  
  
  // defaultBuilding: BuildingShort = new BuildingShort('', 'Select an Erf or PUA First', '', '', '');
  buildings: Buildings = new Buildings([this.defaultBuilding]);

  defaultPUA: PrivateUseAreaShort = new PrivateUseAreaShort('', 'Select an Erf First');
  privateUseAreas: PrivateUseAreas = new PrivateUseAreas([this.defaultPUA]);

  defaultErf: ErfShort = new ErfShort('', 'Select a Township First', '');
  erven: Erven = new Erven([this.defaultErf]);

  defaultTownship: TownshipShort = new TownshipShort('', 'Select a Project First');
  townships: Townships = new Townships([this.defaultTownship]);

  defaultProject: ProjectShort = new ProjectShort('', 'Loading Projects', '', '');
  projects: Projects = new Projects([this.defaultProject]);
  

  projectID = this.filterService.dropdownConvert(this.filterService.projectID);
  townshipID = this.filterService.dropdownConvert(this.filterService.townshipID);
  erfID = this.filterService.dropdownConvert(this.filterService.erfID);
  PUAID = this.filterService.dropdownConvert(this.filterService.PUAID);
  buildingID = this.filterService.dropdownConvert(this.filterService.buildingID);
  buildingsArray;


  ngOnInit() {
    // PROJECTS
    this.projectsService.projectListChanged.subscribe(
      (projects: Projects) => {
        this.projects = projects;
        }
    );
    this.projectsService.fetchProjects();

    // TOWNSHIPS
    this.townshipsService.townshipListChanged.subscribe(
      (townships: Townships) => {
        this.townships = townships;
        }
    );
    if (this.projectID !== null) {
      this.townshipsService.fetchTownships(this.projectID);
    }

    // ERVEN
    this.ervenService.erfListChanged.subscribe(
      (erven: Erven) => {
        this.erven = erven;
        }
    );
    if (this.townshipID !== null) {
      this.ervenService.fetchErven(this.townshipID);
    }

    // PRIVATE USE AREAS
    this.puaService.puaListChanged.subscribe(
      (privateUseAreas: PrivateUseAreas) => {
        this.privateUseAreas = privateUseAreas;
        }
    );
    if (this.erfID !== null) {
      this.puaService.fetchPUA(this.erfID);
    }

    // BUILDINGS
    this.buildingsService.buildingListChanged.subscribe(
      (buildings: Buildings) => {
        this.buildings = buildings;
        this.buildingsArray = this.buildings.buildings;
      }
    );
    if ((this.filterService.projectID !== null) || (this.filterService.contractorID !== null)) {
      this.updateBuildings(
      this.filterService.dropdownConvert(this.projectID),
      this.filterService.dropdownConvert(this.townshipID),
      this.filterService.dropdownConvert(this.erfID),
      this.filterService.dropdownConvert(this.PUAID),
      500,
      0);
    }

  }
  
  // PROJECTS
  projectChange(projectID) {
    this.updateTownships(projectID);
    this.filterService.projectID = projectID;
    this.projectID = projectID;
    this.filterService.townshipID = null;
    this.townshipID = 'instruction';
    this.filterService.erfID = null;
    this.erfID = 'instruction';
    this.filterService.PUAID = null;
    this.PUAID = 'instruction';
    this.filterService.buildingID = null;
    this.buildingID = 'instruction';
    this.filterService.zoningID = null;
    this.updateBuildings(
      projectID,
      null,
      null,
      null,
      500,
      0);
  }

  // TOWNSHIP
  townshipChange(townshipID) {
    this.updateErven(townshipID);
    this.filterService.townshipID = townshipID;
    this.townshipID = townshipID;
    this.filterService.erfID = null;
    this.erfID = 'instruction';
    this.filterService.PUAID = null;
    this.PUAID = 'instruction';
    this.filterService.buildingID = null;
    this.buildingID = 'instruction';
    this.filterService.zoningID = null;
    this.updateBuildings(
      null,
      townshipID,
      null,
      null,
      500,
      0);
  }
  updateTownships(projectID) {
    this.townshipsService.fetchTownships(projectID);
    this.erven = new Erven([this.defaultErf]);
  }

  // ERF
  erfChange(erfID) {
    this.updatePrivateUseAreas(erfID);
    this.filterService.buildingID = null;
    this.buildingID = 'instruction';
    this.updateBuildings(
        null,
        null,
        erfID,
        null,
        500,
        0);
    this.erfID = erfID;
    this.filterService.erfID = erfID;
  }
  updateErven(townshipID) {
    this.ervenService.fetchErven(townshipID);
    this.privateUseAreas = new PrivateUseAreas([this.defaultPUA]);
  }

  // PUA
  PUAChange(PUAID) {
    this.filterService.PUAID = PUAID;
    this.filterService.buildingID = null;
    this.buildingID = 'instruction';
    this.PUAID = PUAID;
    this.updateBuildings(
      null,
      null,
      null,
      PUAID,
      500,
      0);
  }
  updatePrivateUseAreas(erfID) {
    this.puaService.fetchPUA(erfID);
  }

  // BUILDINGS 
  updateBuildings(projectID, townshipID, erfID, PUAID) {
    this.buildingsService.fetchBuildings(projectID, townshipID, erfID, PUAID);
  }
  buildingChange(buildingID) {
    console.log(buildingID);
    this.filterService.buildingID = buildingID;
    this.buildingID = buildingID;
  }

  applyFilter(form: NgForm) {
    if (this.filterService.buildingID === null) {
      alertify.error('Building must be set');
    } else {
      this.router.navigate(['/admin/placeOrders/processingList']); 
    }
  }

}
