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
import { Zonings } from '../../../models/zonings.model';
import { ZoningShort } from '../../../models/zoningShort.model';
import { Contractors } from '../../../models/contractors.model';
import { ContractorShort } from '../../../models/contractorShort.model';
import { DepartmentShort } from '../../../models/departmentShort.model';
import { Departments } from '../../../models/departments.model';
import { Materials } from '../../../models/materials.model';
import { MaterialDetail } from '../../../models/materialDetail.model';
import { OrderGroups } from '../../../models/orderGroups.model';
import { ErvenService } from '../../../services/erven.service';
import { PuaService } from '../../../services/pua.service';
import { BuildingsService } from '../../../services/buildings.service';
import { TownplanningService } from '../../../services/townplanning.service';
import { ContractorsService } from '../../../services/contractors.service';
import { DepartmentsService } from '../../../services/departments.service';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { OrderGroupsService } from '../../../services/ordergroups.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const alertify = require('alertify.js');

@Component({
  selector: 'app-placeordersfilter',
  templateUrl: './placeOrdersFilter.component.html',
  styleUrls: ['./placeOrdersFilter.component.css']
})
export class PlaceOrdersFilterComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private townshipsService: TownshipsService,
    private ervenService: ErvenService,
    private puaService: PuaService,
    private buildingsService: BuildingsService,
    private townplanningService: TownplanningService,
    private materialsService: MaterialsService,
    private contractorsService: ContractorsService,
    private departmentsService: DepartmentsService,
    private filterService: FilterService,
    private orderGroupsService: OrderGroupsService,
    private router: Router) { }

  defaultDepartment: DepartmentShort = new DepartmentShort(null, 'Loading Departments', null);
  departments: Departments = new Departments([this.defaultDepartment]);

  defaultMaterial: MaterialDetail = new MaterialDetail('', 'Select a Building First', null, null, null, null, null, null, null, null);
  materials: Materials = new Materials([this.defaultMaterial]);

  defaultContractor: ContractorShort = new ContractorShort('', 'Loading Contractors');
  contractors: Contractors = new Contractors([this.defaultContractor]);

  defaultZoning: ZoningShort = new ZoningShort('', 'Select a Township First');
  zonings: Zonings = new Zonings([this.defaultZoning]);

  defaultBuilding: BuildingShort = new BuildingShort('', 'Select an Erf or PUA First', '', '', '', '');
  buildings: Buildings = new Buildings([this.defaultBuilding]);

  defaultPUA: PrivateUseAreaShort = new PrivateUseAreaShort('', 'Select an Erf First');
  privateUseAreas: PrivateUseAreas = new PrivateUseAreas([this.defaultPUA]);

  defaultErf: ErfShort = new ErfShort('', 'Select a Township First', '');
  erven: Erven = new Erven([this.defaultErf]);

  defaultTownship: TownshipShort = new TownshipShort('', 'Select a Project First');
  townships: Townships = new Townships([this.defaultTownship]);

  defaultProject: ProjectShort = new ProjectShort('', 'Loading Projects', '', '');
  projects: Projects = new Projects([this.defaultProject]);

  orderGroups: OrderGroups = new OrderGroups(null);




  projectID = this.filterService.dropdownConvert(this.filterService.projectID);
  townshipID = this.filterService.dropdownConvert(this.filterService.townshipID);
  erfID = this.filterService.dropdownConvert(this.filterService.erfID);
  PUAID = this.filterService.dropdownConvert(this.filterService.PUAID);
  buildingID = this.filterService.dropdownConvert(this.filterService.buildingID);
  materialListType = this.filterService.dropdownConvert(this.filterService.materialListType);
  materialID = this.filterService.dropdownConvert(this.filterService.materialID);
  departmentID = this.filterService.dropdownConvert(this.filterService.departmentID);
  contractorID = this.filterService.dropdownConvert(this.filterService.contractorID);
  zoningID = this.filterService.dropdownConvert(this.filterService.zoningID);
  orderGroupID = this.filterService.dropdownConvert(this.filterService.orderGroupID);
  buildingsArray;
  buildingMode = true;


    ngOnInit() {
      this.filterService.materialListType = 'combined';
      this.materialListType = 'combined';
      // ORDER GROUPS
      this.orderGroupsService.orderGroupsListChanged.subscribe(
        (orderGroups: OrderGroups) => {
          this.orderGroups = orderGroups;
          }
      );
      this.orderGroupsService.fetchOrderGroups();
      // PROJECTS
      this.projectsService.projectListChanged.subscribe(
        (projects: Projects) => {
          this.projects = projects;
          }
      );
      this.projectsService.fetchProjects();

      // DEPARTMENTS
      this.departmentsService.departmentListChanged.subscribe(
        (departments: Departments) => {
          this.departments = departments;
          }
      );
      this.departmentsService.fetchDepartments();

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
        this.filterService.dropdownConvert(this.zoningID),
        this.filterService.dropdownConvert(this.contractorID),
        null,
        500,
        0);
      }

      this.townplanningService.zoningListChanged.subscribe(
        (zonings: Zonings) => {
          this.zonings = zonings;
          }
      );
      if (this.filterService.townshipID !== null) {
        this.updateZoning(this.filterService.townshipID);
      }
      this.contractorsService.contractorListChanged.subscribe(
        (contractors: Contractors) => {
          this.contractors = contractors;
          }
      );
      this.contractorsService.fetchContractors(null, null, null, null, null);

      this.materialsService.materialListChanged.subscribe(
        (materials: Materials) => {
          this.materials = materials;
          }
      );
      if (this.buildingID !== null) {
        this.materialsService.fetchMaterials(this.buildingID, 'combined', null);
      }
    }

    // ORDER GROUPS
    orderGroupChange(orderGroupID) {
      this.filterService.projectID = null;
      this.projectID = 'instruction';
      this.filterService.townshipID = null;
      this.townshipID = 'instruction';
      this.filterService.erfID = null;
      this.erfID = 'instruction';
      this.filterService.PUAID = null;
      this.PUAID = 'instruction';
      this.filterService.buildingID = null;
      this.buildingID = 'instruction';
      this.filterService.zoningID = null;
      this.zoningID = 'instruction';
      this.filterService.contractorID = null;
      this.contractorID = 'instruction';
      this.filterService.materialID = null;
      this.materialID = 'instruction';
      this.updateBuildings(
        null,
        null,
        null,
        null,
        null,
        null,
        orderGroupID,
        500,
        0);
      this.filterService.updateBreadcrumb();
    }
  
    // PROJECTS
    projectChange(projectID, projectName) {
      this.filterService.orderGroupID = null;
      this.orderGroupID = 'instruction';
      this.updateTownships(projectID);
      this.filterService.projectID = projectID;
      this.filterService.updateProjectName(projectName);
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
      this.zoningID = 'instruction';
      this.filterService.contractorID = null;
      this.contractorID = 'instruction';
      this.filterService.materialID = null;
      this.materialID = 'instruction';
      this.updateBuildings(
        projectID,
        null,
        null,
        null,
        this.filterService.dropdownConvert(this.zoningID),
        this.filterService.dropdownConvert(this.contractorID),
        null,
        500,
        0);
      this.filterService.updateBreadcrumb();
    }

    // TOWNSHIP
   townshipChange(townshipID, townshipName) {
      if (townshipID === 'none') {
        this.projectChange(this.projectID, this.filterService.projectName)
      } else {
        this.updateErven(townshipID);
        this.updateZoning(townshipID);
        this.contractorsService.fetchContractors(null, townshipID, null, null, null);
        this.filterService.townshipID = townshipID;
        this.townshipID = townshipID;
        this.filterService.updateTownshipName(townshipName);
        this.filterService.erfID = null;
        this.erfID = 'instruction';
        this.filterService.PUAID = null;
        this.PUAID = 'instruction';
        this.filterService.buildingID = null;
        this.buildingID = 'instruction';
        this.filterService.zoningID = null;
        this.zoningID = 'instruction';
        this.filterService.contractorID = null;
        this.contractorID = 'instruction';
        this.filterService.materialID = null;
        this.materialID = 'instruction';
        this.updateBuildings(
          null,
          townshipID,
          null,
          null,
          this.filterService.dropdownConvert(this.zoningID),
          this.filterService.dropdownConvert(this.contractorID),
          null,
          500,
          0);
       this.filterService.updateBreadcrumb();
     }
    }
    updateTownships(projectID) {
      this.townshipsService.fetchTownships(projectID);
      this.erven = new Erven([this.defaultErf]);
      this.contractorsService.fetchContractors(projectID, null, null, null, null);
    }

    // ERF
    erfChange(erfID, erfName) {
      if (erfID === 'none') {
        this.townshipChange(this.townshipID, this.filterService.townshipName)
      } else {
        this.updatePrivateUseAreas(erfID);
        this.filterService.buildingID = null;
        this.buildingID = 'instruction';
        this.filterService.zoningID = null;
        this.zoningID = 'instruction';
        this.filterService.updateErfName(erfName);
        this.filterService.contractorID = null;
        this.contractorID = 'instruction';
        this.filterService.materialID = null;
        this.materialID = 'instruction';
        this.updateBuildings(
            null,
            null,
            erfID,
            null,
            this.filterService.dropdownConvert(this.zoningID),
            this.filterService.dropdownConvert(this.contractorID),
            null,
            500,
            0);
        this.erfID = erfID;
        this.filterService.erfID = erfID;
        this.filterService.updateBreadcrumb();
      }
    }
    updateErven(townshipID) {
      this.ervenService.fetchErven(townshipID);
      this.privateUseAreas = new PrivateUseAreas([this.defaultPUA]);
    }

    // PUA
    PUAChange(PUAID, PUAName) {
      if (PUAID === 'none') {
        this.erfChange(this.erfID, this.filterService.erfName)
      } else {
          this.filterService.PUAID = PUAID;
          this.filterService.buildingID = null;
          this.buildingID = 'instruction';
          this.filterService.zoningID = null;
          this.zoningID = 'instruction';
          this.filterService.contractorID = null;
          this.contractorID = 'instruction';
          this.filterService.materialID = null;
          this.materialID = 'instruction';
          this.PUAID = PUAID;
          this.filterService.updatePUAName(PUAName);
          this.updateBuildings(
            null,
            null,
            null,
            PUAID,
            this.filterService.dropdownConvert(this.zoningID),
            this.filterService.dropdownConvert(this.contractorID),
            null,
            500,
            0);
          this.filterService.updateBreadcrumb();
      }
    }
    updatePrivateUseAreas(erfID) {
      this.puaService.fetchPUA(erfID);
      this.contractorsService.fetchContractors(null, null, erfID, null, null);
    }

    // BUILDINGS
    updateBuildings(projectID, townshipID, erfID, PUAID, zoningID, contractorID, orderGroupID, limit, offset) {
      this.buildingsService.fetchBuildings(projectID, townshipID, erfID, PUAID, zoningID, contractorID, orderGroupID, limit, offset);
      this.contractorsService.fetchContractors(null, null, erfID, PUAID, null);
    }
    buildingChange(buildingID, buildingName) {
      console.log(buildingID);
      this.materialsService.fetchMaterials(buildingID, 'combined', null);
      this.filterService.buildingID = buildingID;
      this.filterService.updateBuildingName(buildingName);
      this.buildingID = buildingID;
      this.filterService.updateBreadcrumb();
    }

    // ZONING
    zoningChange(zoningID) {
      this.filterService.zoningID = zoningID;
      this.zoningID = zoningID;
      this.updateBuildings(
        this.filterService.dropdownConvert(this.projectID),
        this.filterService.dropdownConvert(this.townshipID),
        this.filterService.dropdownConvert(this.erfID),
        this.filterService.dropdownConvert(this.PUAID),
        zoningID,
        this.filterService.dropdownConvert(this.contractorID),
        null,
        500,
        0);
    }
    updateZoning(townshipID) {
      this.townplanningService.fetchZonings(townshipID);
    }
    // CONTRACTOR
    contractorChange(contractorID) {
      console.log(this.projectID);
      this.filterService.contractorID = contractorID;
      this.contractorID = contractorID;
      this.updateBuildings(
        this.filterService.dropdownConvert(this.projectID),
        this.filterService.dropdownConvert(this.townshipID),
        this.filterService.dropdownConvert(this.erfID),
        this.filterService.dropdownConvert(this.PUAID),
        this.filterService.dropdownConvert(this.zoningID),
        contractorID,
        null,
        500,
        0);
    }

    // MATERIALS
    materialChange(materialID) {
      this.filterService.materialID = materialID;
      this.materialID = materialID;
      console.log(materialID);
    }
  
    // DEPARTMENT
    departmentChange(departmentID) {
      if (departmentID === '') {
        departmentID = null;
      }
      this.filterService.departmentID = departmentID;
    }

    toggleMode() {
      this.buildingMode = !this.buildingMode;
    }
    applyFilter(form: NgForm) {
      if (this.buildingMode) {
        if (this.filterService.buildingID === null) {
          alertify.error('Building must be set');
        } else {
          this.router.navigate(['/admin/placeOrders/processingList']);
        }
      } else {
        this.router.navigate(['/admin/placeOrders/departmentProcessingList']);
      }
    }
  
}
