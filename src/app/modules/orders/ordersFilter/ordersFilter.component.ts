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
import { UserShort } from '../../../models/userShort.model';
import { Users } from '../../../models/users.model';
import { ProjectsService } from '../../../services/projects.service';
import { TownshipsService } from '../../../services/townships.service';
import { ErvenService } from '../../../services/erven.service';
import { PuaService } from '../../../services/pua.service';
import { BuildingsService } from '../../../services/buildings.service';
import { FilterService } from '../../../services/filter.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { TrackingService } from '../../../services/tracking.service';
const alertify = require('alertify.js');
@Component({
  selector: 'app-ordersfilter',
  templateUrl: './ordersFilter.component.html',
  styleUrls: ['./ordersFilter.component.css']
})
export class OrdersFilterComponent implements OnInit {

  constructor(
    private projectsService: ProjectsService,
    private townshipsService: TownshipsService,
    private ervenService: ErvenService,
    private puaService: PuaService,
    private buildingsService: BuildingsService,
    private filterService: FilterService,
    private ordersService: OrdersService,
    private router: Router,
    private trackingService: TrackingService,
  ) { }
  defaultBuilding: BuildingShort = new BuildingShort('', 'Select an Erf or PUA First', '', '', '');
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
  listMode = this.ordersService.listMode;
  stockType = 'Check-In';
  placedBy: Users = new Users([new UserShort(null, null)]);
  placedByID = 'instruction';
  ngOnInit() {
    //PLACED BY
    this.trackingService.placedByListChanged.subscribe(
        (placedBy: Users) => {
          this.placedBy = placedBy;
          }
      );
      this.projectsService.fetchProjects();
    this.trackingService.fetchPlacedBy();
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
       }
      );
      if ((this.filterService.projectID !== null) || (this.filterService.contractorID !== null)) {
        this.updateBuildings(
        this.filterService.dropdownConvert(this.projectID),
        this.filterService.dropdownConvert(this.townshipID),
        this.filterService.dropdownConvert(this.erfID),
        this.filterService.dropdownConvert(this.PUAID),
        null,
        null,
        500,
        0);
      }
  }
  // PROJECTS
    projectChange(projectID) {
      console.log("TEST");
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
      this.updateBuildings(
        projectID,
        null,
        null,
        null,
        null,
        null,
        500,
        0);
      this.filterService.updateBreadcrumb();
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
      this.updateBuildings(
        null,
        townshipID,
        null,
        null,
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
          null,
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
      
      this.updateBuildings(
        null,
        null,
        null,
        PUAID,
        null,
        null,
        500,
        0);
    }
    updatePrivateUseAreas(erfID) {
      this.puaService.fetchPUA(erfID);
    }

    // BUILDINGS
    updateBuildings(projectID, townshipID, erfID, PUAID, zoningID, contractorID, limit, offset) {
      this.buildingsService.fetchBuildings(projectID, townshipID, erfID, PUAID, zoningID, contractorID, null, limit, offset);
    }
    buildingChange(buildingID) {
      this.filterService.buildingID = buildingID;
      this.buildingID = buildingID;
    }
  
    applyFilter(form: NgForm) {
      if (form.value.stockType === 'Check-Out') {
        if ((form.value.projectID === 'instruction') || (form.value.placedBy === 'instruction')) { 
          alertify.error('You must choose a check-out person and project');
        } else {
          this.filterService.stockMode = form.value.stockType;
          this.filterService.placedBy = form.value.placedByID;
          this.router.navigate(['/admin/orders/stock']);
        }
      } else {
        this.filterService.stockMode = form.value.stockType;
        this.router.navigate(['/admin/orders/list']);
      }
    }
}
